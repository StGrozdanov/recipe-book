package recepiesserver.recipesserver.utils.validators.validCommentIdValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.PARAMETER, ElementType.METHOD})
@Constraint(validatedBy = ValidCommentIdValidator.class)
public @interface ValidCommentId {
    String message() default "Provided comment id is invalid.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}