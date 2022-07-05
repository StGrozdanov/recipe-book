package recepiesserver.recipesserver.models.dtos.commentDTOs;

import recepiesserver.recipesserver.utils.validators.validRecipeIdValidator.ValidRecipeId;
import recepiesserver.recipesserver.utils.validators.validUserIdValidator.ValidUserId;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentCreateDTO {
    private String content;
    private LocalDateTime createdAt;
    private Long targetRecipeId;
    private Long ownerId;

    public CommentCreateDTO() {
        this.createdAt = LocalDateTime.now();
    }

    @NotBlank(message = "Comment must not be empty or null.")
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

    @ValidRecipeId
    public Long getTargetRecipeId() {
        return targetRecipeId;
    }

    public void setTargetRecipeId(Long targetRecipeId) {
        this.targetRecipeId = targetRecipeId;
    }

    @ValidUserId
    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
}
