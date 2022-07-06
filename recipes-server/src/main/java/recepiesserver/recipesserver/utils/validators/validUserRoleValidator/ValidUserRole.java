package recepiesserver.recipesserver.utils.validators.validUserRoleValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Constraint(validatedBy = ValidUserRoleValidator.class)
public @interface ValidUserRole {
    String message() default "Provided user role is not valid.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}