package recepiesserver.recipesserver.models.DTOs;

import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;

import java.time.LocalDateTime;
import java.util.List;

public class RecipeDTO {
    private String recipeName;
    private LocalDateTime createdAt;
    private List<String> products;
    private List<String> steps;
    private String imageUrl;
    private CategoryEnum category;
    private Long ownerId;
    private Long visitationsCount;
    private PublicationStatusEnum status;

    public RecipeDTO() {
    }


    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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

    public CategoryEnum getCategory() {
        return category;
    }

    public void setCategory(CategoryEnum category) {
        this.category = category;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Long getVisitationsCount() {
        return visitationsCount;
    }

    public void setVisitationsCount(Long visitationsCount) {
        this.visitationsCount = visitationsCount;
    }

    public PublicationStatusEnum getStatus() {
        return status;
    }

    public void setStatus(PublicationStatusEnum status) {
        this.status = status;
    }
}
