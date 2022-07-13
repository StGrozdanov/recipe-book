package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class RecipeFavouritesDTO {
    private Long recipeId;
    private Long userId;

    public RecipeFavouritesDTO() {
    }

    @Positive(message = "Recipe id cannot be negative.")
    @NotNull(message = "Recipe id cannot be null.")
    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    @Positive(message = "User id cannot be negative.")
    @NotNull(message = "User id cannot be null.")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
