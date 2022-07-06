package recepiesserver.recipesserver.models.dtos.userDTOs;


import recepiesserver.recipesserver.models.enums.RoleEnum;
import recepiesserver.recipesserver.models.enums.UserStatusEnum;

public class UserAdminPanelDTO {
    private String username;
    private String email;
    private String avatarUrl;
    private String coverPhotoUrl;
    private RoleEnum primaryRole;
    private UserStatusEnum status;

    public UserAdminPanelDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getCoverPhotoUrl() {
        return coverPhotoUrl;
    }

    public void setCoverPhotoUrl(String coverPhotoUrl) {
        this.coverPhotoUrl = coverPhotoUrl;
    }

    public RoleEnum getPrimaryRole() {
        return primaryRole;
    }

    public void setPrimaryRole(RoleEnum primaryRole) {
        this.primaryRole = primaryRole;
    }

    public UserStatusEnum getStatus() {
        return status;
    }

    public void setStatus(UserStatusEnum status) {
        this.status = status;
    }
}
