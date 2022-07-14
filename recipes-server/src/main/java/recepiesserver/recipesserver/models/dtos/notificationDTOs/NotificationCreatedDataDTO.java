package recepiesserver.recipesserver.models.dtos.notificationDTOs;

import java.util.Set;

public class NotificationCreatedDataDTO {
    private Set<Long> receiverIds;
    private Set<Long> notificationIds;

    public NotificationCreatedDataDTO(Set<Long> receiverIds, Set<Long> notificationIds) {
        this.receiverIds = receiverIds;
        this.notificationIds = notificationIds;
    }

    public NotificationCreatedDataDTO() {
    }

    public Set<Long> getReceiverIds() {
        return receiverIds;
    }

    public NotificationCreatedDataDTO setReceiverIds(Set<Long> receiverIds) {
        this.receiverIds = receiverIds;
        return this;
    }

    public Set<Long> getNotificationIds() {
        return notificationIds;
    }

    public NotificationCreatedDataDTO setNotificationIds(Set<Long> notificationIds) {
        this.notificationIds = notificationIds;
        return this;
    }
}
