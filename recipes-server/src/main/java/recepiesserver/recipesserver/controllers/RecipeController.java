package recepiesserver.recipesserver.controllers;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.*;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserIdDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserMostActiveDTO;
import recepiesserver.recipesserver.services.RecipeService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<List<RecipeCatalogueDTO>> getAllRecipes() {
        return ResponseEntity.ok().body(this.recipeService.getAllRecipes());
    }

    @GetMapping("/pagination")
    public ResponseEntity<Page<RecipeCatalogueDTO>> getAllRecipes(
            @RequestParam(name = "skip", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "limit", defaultValue = "6") Integer collectionCount,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy) {
        return ResponseEntity
                .ok()
                .body(this.recipeService.getRecipesByPage(pageNumber, collectionCount, sortBy));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDetailsDTO> getSingleRecipe(@PathVariable Long id) {
        Optional<RecipeDetailsDTO> singleRecipe = this.recipeService.getSingleRecipe(id);
        if (singleRecipe.isPresent()) {
          return ResponseEntity.ok().body(singleRecipe.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RecipeDetailsDTO> deleteRecipe(@PathVariable Long id) {
        try {
            this.recipeService.deleteRecipe(id);
        } catch (EmptyResultDataAccessException | IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Long> createRecipe(@RequestBody @Valid RecipeCreateDTO recipeDTO) {
        Long createdRecipeId = this.recipeService.createNewRecipe(recipeDTO);

        return createdRecipeId != null
                ? ResponseEntity.ok().body(createdRecipeId)
                : ResponseEntity.unprocessableEntity().build();
    }

    @PutMapping
    public ResponseEntity<Long> editRecipe(@RequestBody @Valid RecipeEditDTO recipeDTO) {
        Long editedRecipeId = this.recipeService.editRecipe(recipeDTO);

        return editedRecipeId != null
                ? ResponseEntity.ok().body(editedRecipeId)
                : ResponseEntity.badRequest().build();
    }

    @GetMapping("/latest-three-recipes")
    public ResponseEntity<List<RecipeLandingPageDTO>> getTheLatestThreeRecipes() {
        return ResponseEntity
                .ok()
                .body(this.recipeService.getTheLatestThreeRecipes());
    }

    @GetMapping("/most-viewed-three-recipes")
    public ResponseEntity<List<RecipeCatalogueDTO>> getTheThreeMostViewedRecipes() {
        return ResponseEntity
                .ok()
                .body(this.recipeService.getTheThreeMostViewedRecipes());
    }

    @PostMapping("/{id}/visitations")
    public ResponseEntity<Long> recordVisitation(@PathVariable Long id) {
        long incrementedVisitations = this.recipeService.incrementRecipeVisitations(id);
        return ResponseEntity.ok().body(incrementedVisitations);
    }

    @PostMapping("/add-to-favourites")
    public ResponseEntity<Long> addToFavourites(@RequestBody @Valid RecipeFavouritesDTO favouritesDTO) {
        this.recipeService.addRecipeToUserFavourites(favouritesDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remove-from-favourites")
    public ResponseEntity<Long> removeFromFavourites(@RequestBody @Valid RecipeFavouritesDTO favouritesDTO) {
        this.recipeService.removeRecipeFromUserFavourites(favouritesDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/searchByName")
    public ResponseEntity<List<RecipeCatalogueDTO>> searchRecipesByName(
            @RequestParam(name = "whereName") String name) {
        return ResponseEntity.ok().body(this.recipeService.findRecipesByName(name));
    }

    @GetMapping("/searchInCreatedRecipes")
    public ResponseEntity<List<RecipeCatalogueDTO>> searchInUserCreatedRecipesByName(
            @RequestParam(name = "whereName") String name, @RequestBody @Valid UserIdDTO userIdDTO) {
        return ResponseEntity.ok().body(this.recipeService.findUserOwnedRecipesByName(name, userIdDTO));
    }

    @GetMapping("/searchByCategories")
    public ResponseEntity<List<RecipeCatalogueDTO>> searchRecipesByMultipleCategories(
            @RequestBody @Valid RecipeCategoriesDTO recipeCategoriesDTO) {
        return ResponseEntity.ok().body(this.recipeService.findRecipesByCategories(recipeCategoriesDTO));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> totalRecipesCount() {
        return ResponseEntity.ok(this.recipeService.getTotalRecipesCount());
    }

    @GetMapping("/most-active-user")
    public ResponseEntity<UserMostActiveDTO> getMostActiveUser() {
        return ResponseEntity.ok(this.recipeService.findTheMostActiveUser());
    }

    @GetMapping("admin-panel")
    public ResponseEntity<List<RecipeAdminPanelDTO>> getAllAdminPanelRecipes() {
        return ResponseEntity.ok().body(this.recipeService.getAllAdminPanelRecipes());
    }

    @PatchMapping("/approve/{id}")
    public ResponseEntity<Long> approveRecipe(@PathVariable Long id) {
        this.recipeService.approveRecipe(id);
        return ResponseEntity.ok().build();
    }

}