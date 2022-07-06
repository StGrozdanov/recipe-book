package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import javax.validation.constraints.NotEmpty;
import java.util.List;

public class RecipeCategoriesDTO {
    List<String> categories;

    public RecipeCategoriesDTO() {
    }

    @NotEmpty
    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}