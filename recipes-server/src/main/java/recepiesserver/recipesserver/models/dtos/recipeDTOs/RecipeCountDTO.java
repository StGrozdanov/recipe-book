package recepiesserver.recipesserver.models.dtos.recipeDTOs;

public class RecipeCountDTO {
    private Integer recipesCount;

    public Integer getRecipesCount() {
        return recipesCount;
    }

    public RecipeCountDTO setRecipesCount(Integer recipesCount) {
        this.recipesCount = recipesCount;
        return this;
    }
}
