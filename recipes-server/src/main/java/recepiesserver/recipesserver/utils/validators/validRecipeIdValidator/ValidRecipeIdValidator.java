package recepiesserver.recipesserver.utils.validators.validRecipeIdValidator;

import recepiesserver.recipesserver.services.RecipeService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidRecipeIdValidator implements ConstraintValidator<ValidRecipeId, Long> {
    private final RecipeService recipeService;

    public ValidRecipeIdValidator(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        return this.recipeService.findRecipeById(value).isPresent();
    }
}