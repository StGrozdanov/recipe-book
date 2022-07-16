package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.exceptions.userExceptions.UserAlreadyBlockedException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserAlreadyExistsException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserIsNotBlockedException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.authDTOs.AuthenticatedLoginDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserLoginDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCountDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeFavouritesDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.*;
import recepiesserver.recipesserver.models.entities.BaseEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.UserStatusEnum;
import recepiesserver.recipesserver.repositories.UserRepository;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;
import recepiesserver.recipesserver.utils.constants.FileMessages;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
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
    private final AuthenticationService authenticationService;

    public UserService(UserRepository userRepository, ModelMapper modelMapper, @Lazy RecipeService recipeService, RoleService roleService, BlacklistService blacklistService, AmazonS3Service amazonS3Service, @Lazy AuthenticationService authenticationService) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.recipeService = recipeService;
        this.roleService = roleService;
        this.blacklistService = blacklistService;
        this.amazonS3Service = amazonS3Service;
        this.authenticationService = authenticationService;
    }

    public Optional<UserEntity> findUserById(Long id) {
        return this.userRepository.findById(id);
    }

    @Transactional
    public UserDetailsDTO getUser(Long userId) {
        UserEntity user = this.getUserById(userId);

        UserDetailsDTO userDTO = this.modelMapper.map(user, UserDetailsDTO.class);

        List<RecipeCatalogueDTO> recipesByUser = this.recipeService.findRecipesByUser(user.getId());

        userDTO.setRecipes(recipesByUser);
        userDTO.setRecipesCount(recipesByUser.size());

        return userDTO;
    }

    public UserProfileDTO getUserProfile(Long userId) {
        UserEntity user = this.getUserById(userId);

        UserProfileDTO userDTO = this.modelMapper.map(user, UserProfileDTO.class);

        RecipeCountDTO userRecipesCount = this.recipeService.getUserRecipesCount(user.getId());

        userDTO.setRecipesCount(userRecipesCount.getRecipesCount());

        return userDTO;
    }

    public AuthenticatedLoginDTO editUserProfile(Long userId,
                                              UserProfileEditDTO userDTO,
                                              MultipartFile profileImageFile,
                                              MultipartFile coverImageFile,
                                              HttpServletRequest request,
                                              HttpServletResponse response) {
        UserEntity oldUserInfo = this.getUserById(userId);

        this.authenticationService.handleInvalidPassword(userDTO.getPassword(), oldUserInfo.getPassword());

        boolean userWithTheSameUsernameOrEmailExists =
                this.otherUserWithSameUsernameOrEmailExists(userDTO, oldUserInfo);

        if (userWithTheSameUsernameOrEmailExists) {
            throw new UserAlreadyExistsException(ExceptionMessages.USER_ALREADY_EXISTS);
        }

        this.uploadCoverAndAvatarImagesToAmazonIfSuchFilesAreProvidedAndSetThemAsDTOImageUrl(
                userDTO,
                profileImageFile,
                coverImageFile
        );

        this.setDefaultValuesForImagesIfNoImageUrlsAreProvided(userDTO);

        UserEntity editedUser = this.modelMapper.map(userDTO, UserEntity.class);

        this.setTheOldUserDefaultInformationToTheEditedUser(oldUserInfo, editedUser);

        this.userRepository.save(editedUser);

        this.authenticationService.logout(request, response);

        UserLoginDTO loginDTO = this.modelMapper.map(userDTO, UserLoginDTO.class);

        return this.authenticationService.login(this.getUserIpAddress(request), loginDTO);
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
        return this.getUserById(userId)
                .getFavourites()
                .stream()
                .filter(recipe -> recipe.getRecipeName().toLowerCase().contains(name.toLowerCase()))
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    public UserCountDTO getTotalUsersCount() {
        return new UserCountDTO().setUsersCount(this.userRepository.count());
    }

    @Transactional
    public List<UserAdminPanelDTO> findUsersByUsername(String username) {
        return this.userRepository
                .findAllByUsernameContaining(username)
                .stream()
                .map(this::mapToUserAdminPanelDTO)
                .toList();
    }

    @Modifying
    public UserModifiedAtDTO changeUserRole(Long userId, UserRoleDTO userRoleDTO) {
        UserEntity user = this.getUserById(userId);

        String desiredRole = userRoleDTO.getRole().toLowerCase();

        if (desiredRole.equals("administrator")) {
            makeUserAdministrator(user);
        } else if (desiredRole.equals("moderator")) {
            makeUserModerator(user);
        } else {
            makeUserRegularUser(user);
        }

        this.userRepository.save(user);

        return new UserModifiedAtDTO().setModifiedAt(LocalDateTime.now());
    }

    @Modifying
    public UserModifiedAtDTO blockUser(UserBlockDTO userBlockDTO) {
        UserEntity user = this.getUserById(userBlockDTO.getId());

        if (!user.getBlocked()) {
            user.setBlocked(true);

            Set<String> ipAddresses = user.getIpAddresses();
            this.blacklistService.addToBlacklist(ipAddresses, userBlockDTO.getReason());

            this.userRepository.save(user);

            return new UserModifiedAtDTO().setModifiedAt(LocalDateTime.now());
        }
        throw new UserAlreadyBlockedException(ExceptionMessages.USER_ALREADY_BLOCKED);
    }

    @Modifying
    public UserModifiedAtDTO unblockUser(Long userId) {
        UserEntity user = this.getUserById(userId);

        if (user.getBlocked()) {
            user.setBlocked(false);
            this.blacklistService.removeFromBlacklist(user.getIpAddresses());
            this.userRepository.save(user);

            return new UserModifiedAtDTO().setModifiedAt(LocalDateTime.now());
        }
        throw new UserIsNotBlockedException(ExceptionMessages.USER_IS_NOT_BLOCKED);
    }

    public UserIdDTO deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
        return new UserIdDTO().setUserId(userId);
    }

    public String getUserProfileOwnerUsername(Long userId) {
        return this.getUserById(userId).getUsername();
    }

    public void saveNewUser(UserEntity newUser) {
        this.userRepository.save(newUser);
    }

    @Transactional
    public List<RecipeCatalogueDTO> findUserFavouriteRecipes(Long userId) {
        return this.getUserById(userId)
                .getFavourites()
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    @Transactional
    public Boolean recipeIsInUserFavourites(RecipeFavouritesDTO favouritesDTO) {
        return this.getUserById(favouritesDTO.getUserId())
                .getFavourites()
                .stream()
                .anyMatch(recipe -> recipe.getId().equals(favouritesDTO.getRecipeId()));
    }

    public List<UserEntity> findAllUsersThatAddedRecipeToFavourites(RecipeEntity recipe) {
        return this.userRepository.findAllByFavouritesContaining(recipe);
    }

    public boolean otherUserWithSameUsernameExists(String username, String userUsername) {
        return this.userRepository.existsByUsernameAndUsernameNot(username, userUsername);
    }

    public boolean otherUserWithSameEmailExists(String email, String userEmail) {
        return this.userRepository.existsByEmailAndEmailNot(email, userEmail);
    }

    private UserEntity getUserById(Long userId) {
        return this.userRepository
                .findById(userId)
                .orElseThrow(() -> new UserNotFoundException(ExceptionMessages.USER_NOT_FOUND));
    }

    private void uploadImageToAmazonIfFileIsProvidedAndSetAsDTOImageUrl(UserProfileEditDTO dto,
                                                                        MultipartFile multipartFile,
                                                                        String type) {
        if (!multipartFile.isEmpty()) {
            String uploadedFileURL = this.amazonS3Service.uploadFile(multipartFile);
            if (type.equals(FileMessages.AVATAR_PHOTO)) {
                dto.setAvatarUrl(uploadedFileURL);
            } else if (type.equals(FileMessages.COVER_PHOTO)) {
                dto.setCoverPhotoUrl(uploadedFileURL);
            }
        }
    }

    private void uploadCoverAndAvatarImagesToAmazonIfSuchFilesAreProvidedAndSetThemAsDTOImageUrl(
            UserProfileEditDTO dto,
            MultipartFile avatarPictureFile,
            MultipartFile coverPictureFile) {
        this.uploadImageToAmazonIfFileIsProvidedAndSetAsDTOImageUrl(dto, avatarPictureFile, FileMessages.AVATAR_PHOTO);
        this.uploadImageToAmazonIfFileIsProvidedAndSetAsDTOImageUrl(dto, coverPictureFile, FileMessages.COVER_PHOTO);
    }

    private void setDefaultValuesForImagesIfNoImageUrlsAreProvided(UserProfileEditDTO userDTO) {
        if (userDTO.getAvatarUrl().isBlank()) {
            userDTO.setAvatarUrl(null);
        }
        if (userDTO.getCoverPhotoUrl().isBlank()) {
            userDTO.setCoverPhotoUrl(null);
        }
    }

    private UserAdminPanelDTO mapToUserAdminPanelDTO(UserEntity user) {
        UserAdminPanelDTO dto = this.modelMapper.map(user, UserAdminPanelDTO.class);
        dto.setStatus(UserStatusEnum.OFFLINE);
        dto.setPrimaryRole(user.getRoles().get(0).getRole());
        return dto;
    }

    private boolean otherUserWithSameUsernameOrEmailExists(UserProfileEditDTO userDTO, UserEntity oldUserInfo) {
        Boolean nonUniqueUsername =
                this.otherUserWithSameUsernameExists(userDTO.getUsername(), oldUserInfo.getUsername());
        Boolean nonUniqueEmail =
                this.otherUserWithSameEmailExists(userDTO.getEmail(), oldUserInfo.getEmail());

        return nonUniqueUsername || nonUniqueEmail;
    }

    private void setTheOldUserDefaultInformationToTheEditedUser(UserEntity oldUserInfo, UserEntity editedUser) {
        editedUser.setBlocked(oldUserInfo.getBlocked());
        editedUser.setFavourites(oldUserInfo.getFavourites());
        editedUser.setRoles(oldUserInfo.getRoles());
        editedUser.setId(oldUserInfo.getId());
        editedUser.setPassword(oldUserInfo.getPassword());
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

    private String getUserIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        return ip == null ? request.getRemoteAddr() : ip;
    }

}