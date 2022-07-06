package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.*;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserIdDTO;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.repositories.RecipeRepository;

import javax.transaction.Transactional;
import java.util.*;

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
        return this.recipeRepository
                .findAll()
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

        List<RecipeCatalogueDTO> recipeCatalogueDTOS = this.recipeRepository
                .findAll(pageable)
                .stream()
                .filter(recipe -> recipe.getStatus() != PublicationStatusEnum.PENDING)
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();

        return new PageImpl<>(recipeCatalogueDTOS);
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

    public List<RecipeLandingPageDTO> getTheLatestThreeRecipes() {
        return this.recipeRepository
                .findTop3ByOrderByCreatedAtDesc()
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeLandingPageDTO.class))
                .toList();
    }

    public List<RecipeCatalogueDTO> getTheThreeMostViewedRecipes() {
        return this.recipeRepository
                .findTop3ByOrderByVisitationsCountDesc()
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    @Modifying
    public long incrementRecipeVisitations(Long id) {
        Optional<RecipeEntity> recipeById = this.recipeRepository.findById(id);

        if (recipeById.isPresent()) {
            RecipeEntity recipe = recipeById.get();
            Long oldVisitationCount = recipe.getVisitationsCount();

            long newVisitationCount = Long.sum(oldVisitationCount, 1);
            recipe.setVisitationsCount(newVisitationCount);
            this.recipeRepository.save(recipe);

            return newVisitationCount;
        }
        //TODO: THROW EXCEPTION
        return -1;
    }

    @Transactional
    public void addRecipeToUserFavourites(RecipeFavouritesDTO favouritesDTO) {
        Optional<UserEntity> userById = this.userService.findUserById(favouritesDTO.getUserId());
        Optional<RecipeEntity> recipeById = this.recipeRepository.findById(favouritesDTO.getRecipeId());

        if (userById.isPresent() && recipeById.isPresent()) {
            UserEntity user = userById.get();
            RecipeEntity recipe = recipeById.get();

            user.addRecipeToFavourites(recipe);
        }

        //TODO: THROW EXCEPTION
    }

    @Transactional
    public void removeRecipeFromUserFavourites(RecipeFavouritesDTO favouritesDTO) {
        Optional<UserEntity> userById = this.userService.findUserById(favouritesDTO.getUserId());
        Optional<RecipeEntity> recipeById = this.recipeRepository.findById(favouritesDTO.getRecipeId());

        if (userById.isPresent() && recipeById.isPresent()) {
            UserEntity user = userById.get();
            RecipeEntity recipe = recipeById.get();

            user.removeRecipeFromFavourites(recipe);
        }

        //TODO: THROW EXCEPTION
    }

    public List<RecipeCatalogueDTO> findRecipesByName(String name) {
        return this.recipeRepository
                .findAllByRecipeNameContaining(name)
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    public List<RecipeCatalogueDTO> findUserOwnedRecipesByName(String name, UserIdDTO userIdDTO) {
        return this.recipeRepository
                .findAllByOwnerIdAndRecipeNameContaining(userIdDTO.getUserId(), name)
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    public List<RecipeCatalogueDTO> findRecipesByCategories(RecipeCategoriesDTO recipeCategoriesDTO) {
        List<CategoryEnum> categoryEnums = convertCategoryNamesCollectionToCategoryEnumsCollection(
                recipeCategoriesDTO);

        return this.recipeRepository
                .findAllByCategoryIn(categoryEnums)
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    public long getTotalRecipesCount() {
        return this.recipeRepository.count();
    }

    private List<CategoryEnum> convertCategoryNamesCollectionToCategoryEnumsCollection(
            RecipeCategoriesDTO recipeCategoriesDTO) {

        List<CategoryEnum> categories = new ArrayList<>();

        recipeCategoriesDTO
                .getCategories()
                .forEach(categoryName -> {
                    CategoryEnum categoryEnum = Arrays.stream(CategoryEnum.values())
                            .filter(category -> category.getName().equals(categoryName))
                            .findFirst()
                            .orElse(null);

                    categories.add(categoryEnum);
                });
        return categories.stream().filter(Objects::nonNull).distinct().toList();
    }
}