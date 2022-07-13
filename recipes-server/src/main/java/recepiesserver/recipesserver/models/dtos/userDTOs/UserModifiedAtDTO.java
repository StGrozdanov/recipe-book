package recepiesserver.recipesserver.models.dtos.userDTOs;

import java.time.LocalDateTime;

public class UserModifiedAtDTO {
    private LocalDateTime modifiedAt;

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public UserModifiedAtDTO setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }
}
