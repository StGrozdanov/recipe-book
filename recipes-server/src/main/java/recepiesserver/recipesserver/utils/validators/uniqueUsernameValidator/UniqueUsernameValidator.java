package recepiesserver.recipesserver.utils.validators.uniqueUsernameValidator;

import recepiesserver.recipesserver.services.UserService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
    private UserService userService;

    public UniqueUsernameValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !this.userService.userWithTheSameUsernameExists(value);
    }
}