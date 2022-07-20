package recepiesserver.recipesserver.models.dtos.notificationDTOs;

public class NotificationCountDTO {
    private long notificationsCount;

    public NotificationCountDTO() {
    }

    public long getNotificationsCount() {
        return notificationsCount;
    }

    public NotificationCountDTO setNotificationsCount(long notificationsCount) {
        this.notificationsCount = notificationsCount;
        return this;
    }
}
