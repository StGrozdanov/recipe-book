package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserDetailsDTO;
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
}
