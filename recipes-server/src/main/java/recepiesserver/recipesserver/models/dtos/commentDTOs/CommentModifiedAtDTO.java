package recepiesserver.recipesserver.models.dtos.commentDTOs;

import java.time.LocalDateTime;

public class CommentModifiedAtDTO {
    private LocalDateTime modifiedAt;

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public CommentModifiedAtDTO setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }
}
