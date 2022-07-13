package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import recepiesserver.recipesserver.models.interfaces.ImageUrl;
import recepiesserver.recipesserver.utils.validators.nonEmptyCollectionValidator.NonEmptyCollection;
import recepiesserver.recipesserver.utils.validators.uniqueRecipeNameValidator.UniqueRecipeName;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

public class RecipeEditDTO implements ImageUrl {
    private String recipeName;
    private List<String> products;
    private List<String> steps;
    private String imageUrl;
    private String category;

    public RecipeEditDTO() {
    }

    @Size(min = 4, message = "Recipe name should be at least 4 characters long.")
    @Pattern(regexp = "^[а-яА-Я\\s]+$", message = "Recipe name should be written in bulgarian.")
    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    @NonEmptyCollection
    @Size(min = 3, message = "Products size should be at least 3 symbols long.")
    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

    @NonEmptyCollection
    @Size(min = 3, message = "Products size should be at least 3 symbols long.")
    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @NotNull(message = "Recipe category is required.")
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}