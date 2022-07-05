package recepiesserver.recipesserver.utils.validators.uniqueRecipeNameValidator;

import recepiesserver.recipesserver.services.RecipeService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueRecipeNameValidator implements ConstraintValidator<UniqueRecipeName, String> {
    private final RecipeService recipeService;

    public UniqueRecipeNameValidator(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !this.recipeService.recipeWithTheSameNameExists(value);
    }
}