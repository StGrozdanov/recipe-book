package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;

public class RecipeAdminPanelDTO {
    private Long id;
    private String recipeName;
    private String imageUrl;
    private PublicationStatusEnum status;
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

    public PublicationStatusEnum getStatus() {
        return status;
    }

    public void setStatus(PublicationStatusEnum status) {
        this.status = status;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
}
