package recepiesserver.recipesserver.models.dtos.commentDTOs;

import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserSummaryDTO;

import java.time.LocalDateTime;

public class CommentDetailsDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private RecipeCatalogueDTO recipe;
    private UserSummaryDTO owner;

    public CommentDetailsDTO() {
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public RecipeCatalogueDTO getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeCatalogueDTO recipe) {
        this.recipe = recipe;
    }

    public UserSummaryDTO getOwner() {
        return owner;
    }

    public void setOwner(UserSummaryDTO owner) {
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}