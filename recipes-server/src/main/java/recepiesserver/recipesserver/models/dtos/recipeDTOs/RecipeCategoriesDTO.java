package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import recepiesserver.recipesserver.utils.validators.nonEmptyCollectionValidator.NonEmptyCollection;

import javax.validation.constraints.NotEmpty;
import java.util.List;

public class RecipeCategoriesDTO {
    List<String> categories;

    public RecipeCategoriesDTO() {
    }

    @NonEmptyCollection
    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}