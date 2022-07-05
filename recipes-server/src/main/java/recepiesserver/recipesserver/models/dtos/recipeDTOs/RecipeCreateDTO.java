package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.utils.validators.nonEmptyCollectionValidator.NonEmptyCollection;
import recepiesserver.recipesserver.utils.validators.uniqueImageValidator.UniqueImage;
import recepiesserver.recipesserver.utils.validators.uniqueRecipeNameValidator.UniqueRecipeName;
import recepiesserver.recipesserver.utils.validators.validUserIdValidator.ValidUserId;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public class RecipeCreateDTO {
    private String recipeName;
    private LocalDateTime createdAt;
    private List<String> products;
    private List<String> steps;
    private String imageUrl;
    private String category;
    private Long ownerId;
    private Long visitationsCount;
    private PublicationStatusEnum status;

    public RecipeCreateDTO() {
        this.createdAt = LocalDateTime.now();
        this.visitationsCount = 0L;
        this.status = PublicationStatusEnum.PENDING;
    }

    @UniqueRecipeName
    @Size(min = 4, message = "Recipe name should be at least 4 characters long.")
    @Pattern(regexp = "^[а-яА-Я\\s]+$", message = "Recipe name should be written in bulgarian.")
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

    @NonEmptyCollection
    @Size(min = 3, message = "Products size should be at least 3 symbols long.")
    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

    @NonEmptyCollection
    @Size(min = 3, message = "Steps size should be at least 3 symbols long.")
    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    @UniqueImage
    @NotEmpty(message = "Recipe image url is required.")
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

    @ValidUserId
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
