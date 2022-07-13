package recepiesserver.recipesserver.utils.validators.validCommentIdValidator;

import recepiesserver.recipesserver.services.CommentService;
import recepiesserver.recipesserver.services.RecipeService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidCommentIdValidator implements ConstraintValidator<ValidCommentId, Long> {
    private final CommentService commentService;

    public ValidCommentIdValidator(CommentService commentService) {
        this.commentService = commentService;
    }

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        return this.commentService.findCommentById(value).isPresent();
    }
}