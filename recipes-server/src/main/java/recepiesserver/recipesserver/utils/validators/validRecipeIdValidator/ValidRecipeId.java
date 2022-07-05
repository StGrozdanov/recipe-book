package recepiesserver.recipesserver.utils.validators.validRecipeIdValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Constraint(validatedBy = ValidRecipeIdValidator.class)
public @interface ValidRecipeId {
    String message() default "Provided recipe id is not valid.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
