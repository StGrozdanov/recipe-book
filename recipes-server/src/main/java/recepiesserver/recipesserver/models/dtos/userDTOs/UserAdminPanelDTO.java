package recepiesserver.recipesserver.models.dtos.userDTOs;

public class UserAdminPanelDTO {
    private Long id;
    private String username;
    private String email;
    private String avatarUrl;
    private String coverPhotoUrl;
    private String primaryRole;
    private Boolean isBlocked;

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

    public String getPrimaryRole() {
        return primaryRole;
    }

    public void setPrimaryRole(String primaryRole) {
        this.primaryRole = primaryRole;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getBlocked() {
        return isBlocked;
    }

    public UserAdminPanelDTO setBlocked(Boolean blocked) {
        isBlocked = blocked;
        return this;
    }
}
