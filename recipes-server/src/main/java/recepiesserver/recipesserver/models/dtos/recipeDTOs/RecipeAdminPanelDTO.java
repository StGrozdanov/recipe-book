package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.models.interfaces.ImageUrl;

public class RecipeAdminPanelDTO implements ImageUrl {
    private Long id;
    private String recipeName;
    private String imageUrl;
    private String statusName;
    private Long ownerId;

    public RecipeAdminPanelDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getStatusName() {
        return statusName;
    }

    public RecipeAdminPanelDTO setStatusName(String statusName) {
        this.statusName = statusName;
        return this;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
}
