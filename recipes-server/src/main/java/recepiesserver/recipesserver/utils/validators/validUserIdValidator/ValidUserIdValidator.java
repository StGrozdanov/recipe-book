package recepiesserver.recipesserver.utils.validators.validUserIdValidator;

import recepiesserver.recipesserver.services.UserService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidUserIdValidator implements ConstraintValidator<ValidUserId, Long> {
    private final UserService userService;

    public ValidUserIdValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        return this.userService.findUserById(value).isPresent();
    }
}