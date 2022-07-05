package recepiesserver.recipesserver.controllers;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.*;
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
}