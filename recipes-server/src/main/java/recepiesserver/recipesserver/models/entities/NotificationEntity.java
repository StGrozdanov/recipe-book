package recepiesserver.recipesserver.models.entities;

import recepiesserver.recipesserver.models.enums.NotificationActionEnum;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "notifications")
public class NotificationEntity extends BaseEntity {
    private LocalDateTime createdAt;
    private Boolean isMarkedAsRead;
    private NotificationActionEnum action;
    private RecipeEntity location;
    private UserEntity fromUser;
    private Set<UserEntity> receivers;

    public NotificationEntity() {
        this.receivers = new HashSet<>();
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

    @ManyToOne
    @JoinColumn(nullable = false)
    public RecipeEntity getLocation() {
        return location;
    }

    public void setLocation(RecipeEntity location) {
        this.location = location;
    }

    @ManyToOne
    @JoinColumn(nullable = false)
    public UserEntity getFromUser() {
        return fromUser;
    }

    public void setFromUser(UserEntity fromUser) {
        this.fromUser = fromUser;
    }

    @ManyToMany
    public Set<UserEntity> getReceivers() {
        return receivers;
    }

    public void setReceivers(Set<UserEntity> receivers) {
        this.receivers = receivers;
    }
}
