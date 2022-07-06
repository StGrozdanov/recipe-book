package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.*;
import recepiesserver.recipesserver.models.entities.BaseEntity;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.RoleEnum;
import recepiesserver.recipesserver.models.enums.UserStatusEnum;
import recepiesserver.recipesserver.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RecipeService recipeService;
    private final RoleService roleService;

    public UserService(UserRepository userRepository, ModelMapper modelMapper, @Lazy RecipeService recipeService, RoleService roleService) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.recipeService = recipeService;
        this.roleService = roleService;
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

    public Long editUserProfile(Long userId, UserProfileEditDTO userDTO) {
        Optional<UserEntity> userById = this.userRepository.findById(userId);

        if (userById.isPresent()) {
            UserEntity oldUserInfo = userById.get();

            if (otherUserWithSameUsernameOrEmailExists(userDTO, oldUserInfo)) {
                return null;
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
    public List<RecipeCatalogueDTO> findUserFavouriteRecipesByName(String name, UserIdDTO userIdDTO) {
        Optional<UserEntity> userById = this.userRepository.findById(userIdDTO.getUserId());

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
}