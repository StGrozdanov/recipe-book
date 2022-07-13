package recepiesserver.recipesserver.models.dtos.notificationDTOs;

import java.time.LocalDateTime;

public class NotificationCreatedAtDTO {
    private LocalDateTime notificationCreatedAt;

    public LocalDateTime getNotificationCreatedAt() {
        return notificationCreatedAt;
    }

    public NotificationCreatedAtDTO setNotificationCreatedAt(LocalDateTime notificationCreatedAt) {
        this.notificationCreatedAt = notificationCreatedAt;
        return this;
    }
}
