package recepiesserver.recipesserver.utils.validators.uniqueImageValidator;

import recepiesserver.recipesserver.services.RecipeService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueImageValidator implements ConstraintValidator<UniqueImage, String> {
    private final RecipeService recipeService;

    public UniqueImageValidator(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return this.recipeService.findRecipeByImage(value).isEmpty();
    }
}