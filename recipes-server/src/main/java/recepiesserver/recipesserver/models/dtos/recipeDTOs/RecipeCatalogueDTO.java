package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import recepiesserver.recipesserver.models.interfaces.ImageUrl;

public class RecipeCatalogueDTO implements ImageUrl {
    private Long id;
    private String imageUrl;
    private String recipeName;

    public RecipeCatalogueDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }
}
