package recepiesserver.recipesserver.models.dtos.notificationDTOs;

import java.time.LocalDateTime;

public class NotificationModifiedAtDTO {
    private LocalDateTime modifiedAt;

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public NotificationModifiedAtDTO setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }
}
