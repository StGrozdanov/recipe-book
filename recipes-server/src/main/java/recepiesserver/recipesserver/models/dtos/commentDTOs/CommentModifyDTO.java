package recepiesserver.recipesserver.models.dtos.commentDTOs;

import java.time.LocalDateTime;

public class CommentModifyDTO {
    private LocalDateTime modifiedAt;

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public CommentModifyDTO setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }
}
