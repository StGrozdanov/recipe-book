package recepiesserver.recipesserver.utils.validators.validUserRoleValidator;

import recepiesserver.recipesserver.models.enums.RoleEnum;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class ValidUserRoleValidator implements ConstraintValidator<ValidUserRole, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        return Arrays.stream(RoleEnum.values())
                .anyMatch(roleEnum -> roleEnum.name().equalsIgnoreCase(value));
    }
}