package recepiesserver.recipesserver.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.*;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserMostActiveDTO;
import recepiesserver.recipesserver.services.RecipeService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

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
        return ResponseEntity.ok().body(this.recipeService.getRecipesByPage(pageNumber, collectionCount, sortBy));
    }

    @GetMapping(Api.GET_SINGLE_RECIPE)
    public ResponseEntity<RecipeDetailsDTO> getSingleRecipe(@PathVariable Long id) {
        return ResponseEntity.ok().body(this.recipeService.getSingleRecipe(id));
    }

    @DeleteMapping(Api.DELETE_RECIPE)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @recipeService.getRecipeOwnerUsername(#id)) " +
            "|| hasRole('ADMINISTRATOR')")
    public ResponseEntity<RecipeModifiedAtDTO> deleteRecipe(@PathVariable Long id, HttpServletRequest request) {
        return ResponseEntity.ok().body(this.recipeService.deleteRecipe(id));
    }

    @PostMapping(Api.RECIPES_ENDPOINT)
    public ResponseEntity<RecipeIdDTO> createRecipe(@RequestParam("data") String recipeData,
                                                    @RequestParam("file") MultipartFile file) throws JsonProcessingException {
        @Valid RecipeCreateDTO dto = new ObjectMapper().readValue(recipeData, RecipeCreateDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.recipeService.createNewRecipe(dto, file));
    }

    @PutMapping(Api.EDIT_RECIPE)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @recipeService.getRecipeOwnerUsername(#recipeId)) " +
            "|| hasRole('ADMINISTRATOR') || hasRole('MODERATOR')")
    public ResponseEntity<RecipeIdDTO> editRecipe(@PathVariable("recipeId") Long recipeId,
                                                  @RequestParam("data") String recipeData,
                                                  @RequestParam("file") MultipartFile file,
                                                  HttpServletRequest request) throws JsonProcessingException {
        @Valid RecipeEditDTO dto = new ObjectMapper().readValue(recipeData, RecipeEditDTO.class);
        return ResponseEntity.ok().body(this.recipeService.editRecipe(dto, file, recipeId));
    }

    @GetMapping(Api.LATEST_THREE_RECIPES)
    public ResponseEntity<List<RecipeLandingPageDTO>> getTheLatestThreeRecipes() {
        return ResponseEntity.ok().body(this.recipeService.getTheLatestThreeRecipes());
    }

    @GetMapping(Api.MOST_VIEWED_THREE_RECIPES)
    public ResponseEntity<List<RecipeCatalogueDTO>> getTheThreeMostViewedRecipes() {
        return ResponseEntity.ok().body(this.recipeService.getTheThreeMostViewedRecipes());
    }

    @PostMapping(Api.RECORD_NEW_RECIPE_VISITATION)
    public ResponseEntity<RecipeVisitationDTO> recordVisitation(@PathVariable Long id) {
        return ResponseEntity.ok().body(this.recipeService.incrementRecipeVisitations(id));
    }

    @PostMapping(Api.ADD_RECIPE_TO_FAVOURITES)
    public ResponseEntity<RecipeModifiedAtDTO> addToFavourites(
            @RequestBody @Valid RecipeFavouritesDTO favouritesDTO) {
        return ResponseEntity.ok().body(this.recipeService.addRecipeToUserFavourites(favouritesDTO));
    }

    @PostMapping(Api.REMOVE_RECIPE_FROM_FAVOURITES)
    public ResponseEntity<RecipeModifiedAtDTO> removeFromFavourites(
            @RequestBody @Valid RecipeFavouritesDTO favouritesDTO) {
        return ResponseEntity.ok().body(this.recipeService.removeRecipeFromUserFavourites(favouritesDTO));
    }

    @GetMapping(Api.SEARCH_BY_RECIPE_NAME)
    public ResponseEntity<List<RecipeCatalogueDTO>> searchRecipesByName(
            @RequestParam(name = "whereName") @NotBlank String name) {
        return ResponseEntity.ok().body(this.recipeService.findRecipesByName(name));
    }

    @GetMapping(Api.USER_CREATED_RECIPES)
    public ResponseEntity<List<RecipeCatalogueDTO>> getUserCreatedRecipes(@PathVariable Long userId) {
        return ResponseEntity.ok().body(this.recipeService.findRecipesByUser(userId));
    }

    @GetMapping(Api.USER_CREATED_RECIPES_COUNT)
    public ResponseEntity<RecipeCountDTO> getUserCreatedRecipesCount(@PathVariable Long userId) {
        return ResponseEntity.ok().body(this.recipeService.getUserRecipesCount(userId));
    }

    @GetMapping(Api.SEARCH_IN_CREATED_RECIPES)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @recipeService.getOwnerUsername(#id)) ")
    public ResponseEntity<List<RecipeCatalogueDTO>> searchInUserCreatedRecipesByName(
            @RequestParam(name = "whereName") @NotBlank String name,
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
    public ResponseEntity<RecipeCountDTO> totalRecipesCount() {
        return ResponseEntity.ok(this.recipeService.getTotalRecipesCount());
    }

    @GetMapping(Api.RECIPES_MOST_ACTIVE_USER)
    public ResponseEntity<UserMostActiveDTO> getMostActiveUser() {
        return ResponseEntity.ok(this.recipeService.findTheMostActiveUser());
    }

    @GetMapping(Api.RECIPES_FOR_ADMIN)
    public ResponseEntity<Page<RecipeAdminPanelDTO>> getAllAdminPanelRecipes(
            @RequestParam(name = "skip", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "limit", defaultValue = "7") Integer collectionCount,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy) {
        return ResponseEntity
                .ok()
                .body(this.recipeService.getAllAdminPanelRecipes(pageNumber, collectionCount, sortBy));
    }

    @GetMapping(Api.RECIPES_FOR_ADMIN_SEARCH)
    public ResponseEntity<Page<RecipeAdminPanelDTO>> getAllAdminPanelRecipes(
            @RequestParam(name = "whereName") @NotBlank String query,
            @RequestParam(name = "skip", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "limit", defaultValue = "7") Integer collectionCount,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy) {
        return ResponseEntity
                .ok()
                .body(this.recipeService.searchAdminPanelRecipes(pageNumber, collectionCount, sortBy, query));
    }

    @PatchMapping(Api.APPROVE_RECIPE)
    public ResponseEntity<RecipeModifiedAtDTO> approveRecipe(@PathVariable Long id) {
        return ResponseEntity.ok().body(this.recipeService.approveRecipe(id));
    }

    @GetMapping(Api.RECIPE_NAME_EXISTS)
    public ResponseEntity<Map<String, Boolean>> recipeExistsByName(@RequestParam("name") String name) {
        boolean exists = this.recipeService.recipeWithTheSameNameExists(name);
        return ResponseEntity.ok().body(Map.of("nameExists", exists));
    }

    @GetMapping(Api.RECIPE_PICTURE_EXISTS)
    public ResponseEntity<Map<String, Boolean>> recipeExistsByPicture(@RequestParam("pictureUrl") String picture) {
        boolean exists = this.recipeService.recipeWithTheSameImageExists(picture);
        return ResponseEntity.ok().body(Map.of("pictureExists", exists));
    }

    @GetMapping(Api.OTHER_RECIPE_NAME_EXISTS)
    public ResponseEntity<Map<String, Boolean>> otherRecipeExistsByName(
            @RequestParam("name") String name,
            @RequestParam("originalName") String originalName) {
        boolean exists = this.recipeService.otherRecipeWithTheSameNameExists(name, originalName);
        return ResponseEntity.ok().body(Map.of("nameExists", exists));
    }

    @GetMapping(Api.OTHER_RECIPE_PICTURE_EXISTS)
    public ResponseEntity<Map<String, Boolean>> otherRecipeExistsByPicture(
            @RequestParam("pictureUrl") String picture,
            @RequestParam("originalPictureUrl") String originalPicture) {
        boolean exists = this.recipeService.otherRecipeWithTheSameImageExists(picture, originalPicture);
        return ResponseEntity.ok().body(Map.of("pictureExists", exists));
    }

}