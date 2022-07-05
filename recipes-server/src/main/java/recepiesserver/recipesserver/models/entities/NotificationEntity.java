package recepiesserver.recipesserver.models.entities;

import recepiesserver.recipesserver.models.enums.NotificationActionEnum;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class NotificationEntity extends BaseEntity {
    private LocalDateTime createdAt;
    private Boolean isMarkedAsRead;
    private NotificationActionEnum action;
    private String locationName;
    private Long locationId;
    private String senderUsername;
    private String senderAvatar;
    private Long receiverId;

    public NotificationEntity() {
        this.isMarkedAsRead = false;
    }

    @Column(name = "created_at", nullable = false)
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Column(name = "is_marked_as_read", nullable = false)
    public Boolean getMarkedAsRead() {
        return isMarkedAsRead;
    }

    public void setMarkedAsRead(Boolean markedAsRead) {
        isMarkedAsRead = markedAsRead;
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public NotificationActionEnum getAction() {
        return action;
    }

    public void setAction(NotificationActionEnum action) {
        this.action = action;
    }

    @Column(name = "location_name", nullable = false)
    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    @Column(name = "location_id",nullable = false)
    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    @Column(name = "sender_username", nullable = false)
    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    @Column(name = "sender_avatar")
    public String getSenderAvatar() {
        return senderAvatar;
    }

    public void setSenderAvatar(String senderAvatar) {
        this.senderAvatar = senderAvatar;
    }

    @Column(name = "receiver_id", nullable = false)
    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }
}