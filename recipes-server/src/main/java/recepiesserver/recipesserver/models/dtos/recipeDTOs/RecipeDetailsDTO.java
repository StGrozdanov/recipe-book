package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.models.interfaces.ImageUrl;

import java.util.List;

public class RecipeDetailsDTO implements ImageUrl {
    private Long id;
    private String recipeName;
    private List<String> products;
    private List<String> steps;
    private String imageUrl;
    private String categoryName;
    private Long ownerId;
    private PublicationStatusEnum status;

    public RecipeDetailsDTO() {
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

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

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PublicationStatusEnum getStatus() {
        return status;
    }

    public RecipeDetailsDTO setStatus(PublicationStatusEnum status) {
        this.status = status;
        return this;
    }
}
