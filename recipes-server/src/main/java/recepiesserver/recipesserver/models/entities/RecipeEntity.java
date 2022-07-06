package recepiesserver.recipesserver.models.entities;

import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "recipes")
public class RecipeEntity extends BaseEntity {
    private String recipeName;
    private LocalDateTime createdAt;
    private List<String> products;
    private List<String> steps;
    private String imageUrl;
    private CategoryEnum category;
    private Long ownerId;
    private Long visitationsCount;
    private PublicationStatusEnum status;

    public RecipeEntity() {
        this.products = new ArrayList<>();
        this.steps = new ArrayList<>();
    }

    @Column(name = "recipe_name", nullable = false, unique = true)
    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    @Column(name = "created_at", nullable = false)
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @ElementCollection
    @Column(name = "products", nullable = false, columnDefinition = "TEXT")
    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

    @ElementCollection
    @Column(name = "steps", nullable = false, columnDefinition = "TEXT")
    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    @Column(name = "image_url", nullable = false, unique = true)
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public CategoryEnum getCategory() {
        return category;
    }

    public void setCategory(CategoryEnum category) {
        this.category = category;
    }

    @Column(nullable = false)
    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    @Column(name = "visitations_count", nullable = false)
    public Long getVisitationsCount() {
        return visitationsCount;
    }

    public void setVisitationsCount(Long visitationsCount) {
        this.visitationsCount = visitationsCount;
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public PublicationStatusEnum getStatus() {
        return status;
    }

    public void setStatus(PublicationStatusEnum status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecipeEntity that = (RecipeEntity) o;
        return recipeName.equals(that.recipeName) && imageUrl.equals(that.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeName, imageUrl);
    }
}
