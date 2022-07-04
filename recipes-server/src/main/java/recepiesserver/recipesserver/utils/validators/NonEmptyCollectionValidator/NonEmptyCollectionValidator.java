package recepiesserver.recipesserver.utils.validators.NonEmptyCollectionValidator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class NonEmptyCollectionValidator implements ConstraintValidator<NonEmptyCollection, List<String>> {
    @Override
    public boolean isValid(List<String> collection, ConstraintValidatorContext context) {
        return collection.stream().allMatch(element -> element != null && !element.trim().isEmpty());
    }
}