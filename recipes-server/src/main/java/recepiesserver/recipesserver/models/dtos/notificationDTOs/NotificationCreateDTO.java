package recepiesserver.recipesserver.models.dtos.notificationDTOs;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

public class NotificationCreateDTO {
    private LocalDateTime createdAt;
    private Boolean isMarkedAsRead;
    private String action;
    private String locationName;
    private Long locationId;
    private String senderUsername;
    private String senderAvatar;

    public NotificationCreateDTO() {
        this.createdAt = LocalDateTime.now();
        this.isMarkedAsRead = false;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getMarkedAsRead() {
        return isMarkedAsRead;
    }

    public void setMarkedAsRead(Boolean markedAsRead) {
        isMarkedAsRead = markedAsRead;
    }

    @NotBlank(message = "Notification action is required.")
    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    @NotNull
    @Size(min = 4, message = "Recipe name should be at least 4 characters long.")
    @Pattern(regexp = "^[а-яА-Я\\s]+$", message = "Recipe name should be written in bulgarian.")
    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    @NotNull(message = "Location id should not be null")
    @Positive(message = "Location id should be valid")
    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 10, message = "Username length should be between 3 and 10 symbols long.")
    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public String getSenderAvatar() {
        return senderAvatar;
    }

    public void setSenderAvatar(String senderAvatar) {
        this.senderAvatar = senderAvatar;
    }
}
