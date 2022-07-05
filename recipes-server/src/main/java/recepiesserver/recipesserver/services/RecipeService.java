package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCreateDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeDetailsDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeEditDTO;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.repositories.RecipeRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;

    public RecipeService(RecipeRepository recipeRepository, ModelMapper modelMapper, UserService userService) {
        this.recipeRepository = recipeRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
    }

    public List<RecipeCatalogueDTO> getAllRecipes() {
        List<RecipeEntity> allRecipes = this.recipeRepository.findAll();

        return allRecipes
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    @Transactional
    public Optional<RecipeDetailsDTO> getSingleRecipe(Long id) {
        Optional<RecipeEntity> optionalEntity = this.recipeRepository.findById(id);

        RecipeDetailsDTO recipeDetailsDTO = this.modelMapper.map(optionalEntity, RecipeDetailsDTO.class);

        return Optional.ofNullable(recipeDetailsDTO);
    }

    @Transactional
    public void deleteRecipe(Long id) {
        this.recipeRepository.deleteById(id);
    }

    public Page<RecipeCatalogueDTO> getRecipesByPage(Integer pageNumber, Integer collectionCount, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, collectionCount, Sort.by(sortBy));

        return this.recipeRepository
                .findAll(pageable)
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class));
    }

    public Long createNewRecipe(RecipeCreateDTO recipeDTO) {
        Optional<UserEntity> userById = this.userService.findUserById(recipeDTO.getOwnerId());

        RecipeEntity newRecipe = this.modelMapper.map(recipeDTO, RecipeEntity.class);
        //the custom user id validator will handle the optional error case
        newRecipe.setOwnerId(userById.get().getId());

        RecipeEntity createdRecipe = this.recipeRepository.save(newRecipe);

        return createdRecipe.getId();
    }

    public Optional<RecipeEntity> findRecipeById(Long id) {
        return this.recipeRepository.findById(id);
    }

    public Long editRecipe(RecipeEditDTO recipeDTO) {
        Optional<RecipeEntity> recipeById = this.recipeRepository.findById(recipeDTO.getId());

        if (recipeById.isPresent()) {
            RecipeEntity oldRecipe = recipeById.get();

            if (otherRecipeWithTheSameNameOrImageExists(recipeDTO, oldRecipe)) {
                return null;
            }

            RecipeEntity editedRecipe = this.modelMapper.map(recipeDTO, RecipeEntity.class);

            setTheOldRecipeDefaultInformationToTheEditedRecipe(oldRecipe, editedRecipe);

            return this.recipeRepository.save(editedRecipe).getId();
        }
        return null;
    }

    public List<RecipeCatalogueDTO> findRecipesByUser(Long userId) {
        return this.recipeRepository
                                .findAllByOwnerId(userId)
                                .stream()
                                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                                .toList();
    }

    public Integer getUserRecipesCount(Long userId) {
        return this.recipeRepository.countByOwnerId(userId);
    }

    private void setTheOldRecipeDefaultInformationToTheEditedRecipe(RecipeEntity oldRecipe,
                                                                    RecipeEntity editedRecipe) {
        editedRecipe.setOwnerId(oldRecipe.getOwnerId());
        editedRecipe.setCreatedAt(oldRecipe.getCreatedAt());
        editedRecipe.setVisitationsCount(oldRecipe.getVisitationsCount());
        editedRecipe.setStatus(oldRecipe.getStatus());
    }

    private boolean otherRecipeWithTheSameNameOrImageExists(RecipeEditDTO recipeDTO, RecipeEntity oldRecipeInfo) {
        Boolean nonUniqueRecipeName = this.recipeRepository
                .existsByRecipeNameAndRecipeNameNot(recipeDTO.getRecipeName(), oldRecipeInfo.getRecipeName());
        Boolean nonUniqueImageUrl = this.recipeRepository
                .existsByImageUrlAndImageUrlNot(recipeDTO.getImageUrl(), oldRecipeInfo.getImageUrl());

        return nonUniqueRecipeName || nonUniqueImageUrl;
    }

    public boolean recipeWithTheSameImageExists(String imageUrl) {
        return this.recipeRepository.existsByImageUrl(imageUrl);
    }

    public boolean recipeWithTheSameNameExists(String recipeName) {
        return this.recipeRepository.existsByRecipeName(recipeName);
    }
}
