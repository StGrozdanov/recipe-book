package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserDetailsDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserProfileDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserProfileEditDTO;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RecipeService recipeService;

    public UserService(UserRepository userRepository, ModelMapper modelMapper, @Lazy RecipeService recipeService) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.recipeService = recipeService;
    }

    public Optional<UserEntity> findUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public Optional<UserEntity> findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
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
}
