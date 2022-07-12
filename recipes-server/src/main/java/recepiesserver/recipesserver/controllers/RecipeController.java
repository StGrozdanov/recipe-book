package recepiesserver.recipesserver.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.exceptions.CustomException;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.*;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserIdDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserMostActiveDTO;
import recepiesserver.recipesserver.services.RecipeService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

   @GetMapping(Api.RECIPES_ENDPOINT)
    public ResponseEntity<List<RecipeCatalogueDTO>> getAllRecipes() {
        return ResponseEntity.ok().body(this.recipeService.getAllRecipes());
    }

    @GetMapping(Api.RECIPE_PAGES)
    public ResponseEntity<Page<RecipeCatalogueDTO>> getAllRecipes(
            @RequestParam(name = "skip", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "limit", defaultValue = "6") Integer collectionCount,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy) {
        return ResponseEntity
                .ok()
                .body(this.recipeService.getRecipesByPage(pageNumber, collectionCount, sortBy));
    }

    @GetMapping(Api.GET_SINGLE_RECIPE)
    public ResponseEntity<RecipeDetailsDTO> getSingleRecipe(@PathVariable Long id) {
        Optional<RecipeDetailsDTO> singleRecipe = this.recipeService.getSingleRecipe(id);
        if (singleRecipe.isPresent()) {
          return ResponseEntity.ok().body(singleRecipe.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping(Api.DELETE_RECIPE)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @recipeService.getRecipeOwnerUsername(#id)) " +
            "|| hasRole('ADMINISTRATOR')")
    public ResponseEntity<RecipeDetailsDTO> deleteRecipe(@PathVariable Long id, HttpServletRequest request) {
        try {
            this.recipeService.deleteRecipe(id);
        } catch (EmptyResultDataAccessException | IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping(Api.RECIPES_ENDPOINT)
    public ResponseEntity<Long> createRecipe(
            @RequestParam("data") String recipeData,
            @RequestParam("file") MultipartFile file) throws JsonProcessingException {
        @Valid RecipeCreateDTO dto = new ObjectMapper().readValue(recipeData, RecipeCreateDTO.class);

        Long createdRecipeId = this.recipeService.createNewRecipe(dto, file);

        return createdRecipeId != null
                ? ResponseEntity.ok().body(createdRecipeId)
                : ResponseEntity.unprocessableEntity().build();
    }

    @PutMapping(Api.EDIT_RECIPE)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @recipeService.getRecipeOwnerUsername(#recipeId)) " +
            "|| hasRole('ADMINISTRATOR') || hasRole('MODERATOR')")
    public ResponseEntity<Long> editRecipe(
            @PathVariable("recipeId") Long recipeId,
            @RequestParam("data") String recipeData,
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request) throws JsonProcessingException {
        @Valid RecipeEditDTO dto = new ObjectMapper().readValue(recipeData, RecipeEditDTO.class);

        Long editedRecipeId = this.recipeService.editRecipe(dto, file, recipeId);

        return editedRecipeId != null
                ? ResponseEntity.ok().body(editedRecipeId)
                : ResponseEntity.badRequest().build();
    }

    @GetMapping(Api.LATEST_THREE_RECIPES)
    public ResponseEntity<List<RecipeLandingPageDTO>> getTheLatestThreeRecipes() {
        return ResponseEntity
                .ok()
                .body(this.recipeService.getTheLatestThreeRecipes());
    }

    @GetMapping(Api.MOST_VIEWED_THREE_RECIPES)
    public ResponseEntity<List<RecipeCatalogueDTO>> getTheThreeMostViewedRecipes() {
        return ResponseEntity
                .ok()
                .body(this.recipeService.getTheThreeMostViewedRecipes());
    }

    @PostMapping(Api.RECORD_NEW_RECIPE_VISITATION)
    public ResponseEntity<Long> recordVisitation(@PathVariable Long id) {
        long incrementedVisitations = this.recipeService.incrementRecipeVisitations(id);
        return ResponseEntity.ok().body(incrementedVisitations);
    }

    @PostMapping(Api.ADD_RECIPE_TO_FAVOURITES)
    public ResponseEntity<Long> addToFavourites(@RequestBody @Valid RecipeFavouritesDTO favouritesDTO) {
        this.recipeService.addRecipeToUserFavourites(favouritesDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping(Api.REMOVE_RECIPE_FROM_FAVOURITES)
    public ResponseEntity<Long> removeFromFavourites(@RequestBody @Valid RecipeFavouritesDTO favouritesDTO) {
        this.recipeService.removeRecipeFromUserFavourites(favouritesDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping(Api.SEARCH_BY_RECIPE_NAME)
    public ResponseEntity<List<RecipeCatalogueDTO>> searchRecipesByName(
            @RequestParam(name = "whereName") String name) {
        return ResponseEntity.ok().body(this.recipeService.findRecipesByName(name));
    }

    @GetMapping(Api.USER_CREATED_RECIPES)
    public ResponseEntity<List<RecipeCatalogueDTO>> getUserCreatedRecipes(@PathVariable Long userId) {
        return ResponseEntity.ok().body(this.recipeService.findRecipesByUser(userId));
    }

    @GetMapping(Api.USER_CREATED_RECIPES_COUNT)
    public ResponseEntity<Integer> getUserCreatedRecipesCount(@PathVariable Long userId) {
        return ResponseEntity.ok().body(this.recipeService.getUserRecipesCount(userId));
    }

    @GetMapping(Api.SEARCH_IN_CREATED_RECIPES)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @recipeService.getRecipeOwnerUsername(#id)) ")
    public ResponseEntity<List<RecipeCatalogueDTO>> searchInUserCreatedRecipesByName(
            @RequestParam(name = "whereName") String name,
            @RequestParam(name = "whereUser") Long id,
            HttpServletRequest request) {
        return ResponseEntity.ok().body(this.recipeService.findUserOwnedRecipesByName(name, id));
    }

    @PostMapping(Api.SEARCH_BY_RECIPE_CATEGORY)
    public ResponseEntity<List<RecipeCatalogueDTO>> searchRecipesByMultipleCategories(
            @RequestBody @Valid RecipeCategoriesDTO recipeCategoriesDTO) {
        return ResponseEntity.ok().body(this.recipeService.findRecipesByCategories(recipeCategoriesDTO));
    }

    @GetMapping(Api.RECIPES_COUNT)
    public ResponseEntity<Long> totalRecipesCount() {
        return ResponseEntity.ok(this.recipeService.getTotalRecipesCount());
    }

    @GetMapping(Api.RECIPES_MOST_ACTIVE_USER)
    public ResponseEntity<UserMostActiveDTO> getMostActiveUser() {
        return ResponseEntity.ok(this.recipeService.findTheMostActiveUser());
    }

    @GetMapping(Api.RECIPES_FOR_ADMIN)
    public ResponseEntity<List<RecipeAdminPanelDTO>> getAllAdminPanelRecipes() {
        return ResponseEntity.ok().body(this.recipeService.getAllAdminPanelRecipes());
    }

    @PatchMapping(Api.APPROVE_RECIPE)
    public ResponseEntity<Long> approveRecipe(@PathVariable Long id) {
        this.recipeService.approveRecipe(id);
        return ResponseEntity.ok().build();
    }

}