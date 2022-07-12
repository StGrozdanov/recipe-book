package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeFavouritesDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.*;
import recepiesserver.recipesserver.models.entities.BaseEntity;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.UserStatusEnum;
import recepiesserver.recipesserver.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RecipeService recipeService;
    private final RoleService roleService;
    private final BlacklistService blacklistService;
    private final AmazonS3Service amazonS3Service;

    public UserService(UserRepository userRepository, ModelMapper modelMapper, @Lazy RecipeService recipeService, RoleService roleService, BlacklistService blacklistService, AmazonS3Service amazonS3Service) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.recipeService = recipeService;
        this.roleService = roleService;
        this.blacklistService = blacklistService;
        this.amazonS3Service = amazonS3Service;
    }

    public Optional<UserEntity> findUserById(Long id) {
        return this.userRepository.findById(id);
    }

    @Transactional
    public Optional<UserDetailsDTO> getUser(Long userId) {
        Optional<UserEntity> userById = this.userRepository.findById(userId);

        if (userById.isPresent()) {
            UserEntity user = userById.get();

            UserDetailsDTO userDTO = this.modelMapper.map(user, UserDetailsDTO.class);

            List<RecipeCatalogueDTO> recipesByUser = this.recipeService.findRecipesByUser(user.getId());

            userDTO.setRecipes(recipesByUser);
            userDTO.setRecipesCount(recipesByUser.size());

            return Optional.of(userDTO);
        }
        return Optional.empty();
    }

    public Optional<UserProfileDTO> getUserProfile(Long userId) {
        Optional<UserEntity> userById = this.userRepository.findById(userId);

        if (userById.isPresent()) {
            UserEntity user = userById.get();

            UserProfileDTO userDTO = this.modelMapper.map(user, UserProfileDTO.class);

            Integer userRecipesCount = this.recipeService.getUserRecipesCount(user.getId());

            userDTO.setRecipesCount(userRecipesCount);

            return Optional.of(userDTO);
        }
        return Optional.empty();
    }

    public Long editUserProfile(Long userId,
                                UserProfileEditDTO userDTO,
                                MultipartFile profileImageFile,
                                MultipartFile coverImageFile) {
        Optional<UserEntity> userById = this.userRepository.findById(userId);

        if (userById.isPresent()) {
            UserEntity oldUserInfo = userById.get();

            if (otherUserWithSameUsernameOrEmailExists(userDTO, oldUserInfo)) {
                return null;
            }
            if (!profileImageFile.isEmpty()) {
                String uploadedFileURL = this.amazonS3Service.uploadFile(profileImageFile);
                userDTO.setAvatarUrl(uploadedFileURL);
            }
            if (!coverImageFile.isEmpty()) {
                String uploadedFileURL = this.amazonS3Service.uploadFile(coverImageFile);
                userDTO.setCoverPhotoUrl(uploadedFileURL);
            }
            if (oldUserInfo.getAvatarUrl() != null
                    && oldUserInfo.getAvatarUrl().contains("amazonaws")
                    && !oldUserInfo.getAvatarUrl().equals(userDTO.getAvatarUrl())) {
                this.amazonS3Service.deleteFile(oldUserInfo.getAvatarUrl());
            }
            if (oldUserInfo.getCoverPhotoUrl() != null
                    && oldUserInfo.getCoverPhotoUrl().contains("amazonaws")
                    && !oldUserInfo.getCoverPhotoUrl().equals(userDTO.getCoverPhotoUrl())) {
                this.amazonS3Service.deleteFile(oldUserInfo.getCoverPhotoUrl());
            }
            if (userDTO.getAvatarUrl().equals("")) {
                userDTO.setAvatarUrl(null);
            }
            if (userDTO.getCoverPhotoUrl().equals("")) {
                userDTO.setCoverPhotoUrl(null);
            }

            UserEntity editedUser = this.modelMapper.map(userDTO, UserEntity.class);

            setTheOldUserDefaultInformationToTheEditedUser(oldUserInfo, editedUser);

            return this.userRepository.save(editedUser).getId();
        }
        return null;
    }

    private boolean otherUserWithSameUsernameOrEmailExists(UserProfileEditDTO userDTO, UserEntity oldUserInfo) {
        Boolean nonUniqueUsername = this.userRepository
                .existsByUsernameAndUsernameNot(userDTO.getUsername(), oldUserInfo.getUsername());
        Boolean nonUniqueEmail = this.userRepository
                .existsByEmailAndEmailNot(userDTO.getEmail(), oldUserInfo.getEmail());

        return nonUniqueUsername || nonUniqueEmail;
    }

    private void setTheOldUserDefaultInformationToTheEditedUser(UserEntity oldUserInfo, UserEntity editedUser) {
        editedUser.setBlocked(oldUserInfo.getBlocked());
        editedUser.setFavourites(oldUserInfo.getFavourites());
        editedUser.setRoles(oldUserInfo.getRoles());
        editedUser.setId(oldUserInfo.getId());
        editedUser.setPassword(oldUserInfo.getPassword());
    }

    public boolean userWithTheSameUsernameExists(String username) {
        return this.userRepository.existsByUsername(username);
    }

    public boolean userWithTheSameEmailExists(String email) {
        return this.userRepository.existsByEmail(email);
    }

    public List<Long> getAllAdministratorIds() {
        RoleEntity administrator = this.roleService.getAdministratorEntity();

        return this.userRepository.findAllByRolesContaining(administrator).stream().map(BaseEntity::getId).toList();
    }

    public List<Long> getAllModeratorIds() {
        RoleEntity moderator = this.roleService.getModeratorEntity();

        return this.userRepository.findAllByRolesContaining(moderator).stream().map(BaseEntity::getId).toList();
    }

    public Optional<UserEntity> findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Transactional
    public List<RecipeCatalogueDTO> findUserFavouriteRecipesByName(String name, Long userId) {
        Optional<UserEntity> userById = this.userRepository.findById(userId);

        if (userById.isPresent()) {
            UserEntity user = userById.get();
            return user
                    .getFavourites()
                    .stream()
                    .filter(recipe -> recipe.getRecipeName().toLowerCase().contains(name.toLowerCase()))
                    .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                    .toList();
        }
        //TODO: THROW EXCEPTION
        return null;
    }

    public long getTotalUsersCount() {
        return this.userRepository.count();
    }

    @Transactional
    public List<UserAdminPanelDTO> findUsersByUsername(String username) {
        return this.userRepository
                .findAllByUsernameContaining(username)
                .stream()
                .map(user -> {
                    UserAdminPanelDTO dto = this.modelMapper.map(user, UserAdminPanelDTO.class);
                    dto.setStatus(UserStatusEnum.OFFLINE);
                    dto.setPrimaryRole(user.getRoles().get(0).getRole());

                    return dto;
                })
                .toList();
    }

    @Modifying
    public void changeUserRole(Long userId, UserRoleDTO userRoleDTO) {
        Optional<UserEntity> userById = this.userRepository.findById(userId);

        if (userById.isPresent()) {
            UserEntity user = userById.get();
            String desiredRole = userRoleDTO.getRole().toLowerCase();

            if (desiredRole.equals("administrator")) {
                makeUserAdministrator(user);
            } else if (desiredRole.equals("moderator")) {
                makeUserModerator(user);
            } else {
                makeUserRegularUser(user);
            }

            this.userRepository.save(user);
        }
        //TODO: THROW ERROR
    }

    private void makeUserRegularUser(UserEntity user) {
        RoleEntity userEntity = this.roleService.getUserEntity();
        user.setRoles(new ArrayList<>(List.of(userEntity)));
    }

    private void makeUserModerator(UserEntity user) {
        RoleEntity moderatorEntity = this.roleService.getModeratorEntity();
        RoleEntity userEntity = this.roleService.getUserEntity();

        user.setRoles(new ArrayList<>(List.of(moderatorEntity, userEntity)));
    }

    private void makeUserAdministrator(UserEntity user) {
        RoleEntity administratorEntity = this.roleService.getAdministratorEntity();
        RoleEntity moderatorEntity = this.roleService.getModeratorEntity();
        RoleEntity userEntity = this.roleService.getUserEntity();

        user.setRoles(new ArrayList<>(List.of(administratorEntity, moderatorEntity, userEntity)));
    }

    @Modifying
    public void blockUser(UserBlockDTO userBlockDTO) {
        Optional<UserEntity> byId = this.userRepository.findById(userBlockDTO.getId());

        if (byId.isPresent()) {
            UserEntity user = byId.get();

            if (!user.getBlocked()) {
                user.setBlocked(true);

                Set<String> ipAddresses = user.getIpAddresses();
                this.blacklistService.addToBlacklist(ipAddresses, userBlockDTO.getReason());

                this.userRepository.save(user);
            }
        }
        //TODO THROW
    }

    public void unblockUser(Long userId) {
        Optional<UserEntity> byId = this.userRepository.findById(userId);

        if (byId.isPresent()) {
            UserEntity user = byId.get();

            if (!user.getBlocked()) {
                user.setBlocked(false);
                this.blacklistService.removeFromBlacklist(user.getIpAddresses());
                this.userRepository.save(user);
            }
        }
    }

    public void deleteUser(Long userId) {
        if (userId != null) {
            this.userRepository.deleteById(userId);
        }
        //TODO: THROW
    }

    public String getUserProfileOwnerUsername(Long userId) {
        return this.userRepository.findById(userId).orElseThrow().getUsername();
    }

    public void saveNewUser(UserEntity newUser) {
        this.userRepository.save(newUser);
    }

    @Transactional
    public List<RecipeCatalogueDTO> findUserFavouriteRecipes(Long userId) {
        Optional<UserEntity> userById = this.userRepository.findById(userId);

        if (userById.isPresent()) {
            UserEntity user = userById.get();
            return user
                    .getFavourites()
                    .stream()
                    .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                    .toList();
        }
        //TODO: THROW EXCEPTION
        return null;
    }

    public Boolean recipeIsInUserFavourites(RecipeFavouritesDTO favouritesDTO) {
        Optional<UserEntity> userById = this.userRepository.findById(favouritesDTO.getUserId());

        if (userById.isPresent()) {
            UserEntity user = userById.get();
            return user
                    .getFavourites()
                    .stream()
                    .anyMatch(recipe -> recipe.getId().equals(favouritesDTO.getRecipeId()));
        }
        //TODO: THROW EXCEPTION
        return null;
    }
}