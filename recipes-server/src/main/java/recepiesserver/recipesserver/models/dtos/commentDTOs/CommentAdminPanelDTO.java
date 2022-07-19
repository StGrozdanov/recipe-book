package recepiesserver.recipesserver.models.dtos.commentDTOs;

public class CommentAdminPanelDTO {
    private Long id;
    private String content;
    private Long ownerId;
    private String ownerAvatarUrl;
    private Long targetRecipeId;

    public CommentAdminPanelDTO() {
    }

    public Long getId() {
        return id;
    }

    public CommentAdminPanelDTO setId(Long id) {
        this.id = id;
        return this;
    }

    public String getContent() {
        return content;
    }

    public CommentAdminPanelDTO setContent(String content) {
        this.content = content;
        return this;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public CommentAdminPanelDTO setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
        return this;
    }

    public String getOwnerAvatarUrl() {
        return ownerAvatarUrl;
    }

    public CommentAdminPanelDTO setOwnerAvatarUrl(String ownerAvatarUrl) {
        this.ownerAvatarUrl = ownerAvatarUrl;
        return this;
    }

    public Long getTargetRecipeId() {
        return targetRecipeId;
    }

    public CommentAdminPanelDTO setTargetRecipeId(Long targetRecipeId) {
        this.targetRecipeId = targetRecipeId;
        return this;
    }
}
