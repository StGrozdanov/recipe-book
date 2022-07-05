package recepiesserver.recipesserver.models.dtos.userDTOs;

public class UserProfileDTO {
    private String username;
    private String email;
    private String avatarUrl;
    private String coverPhotoUrl;
    private Integer recipesCount;

    public UserProfileDTO() {
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

    public Integer getRecipesCount() {
        return recipesCount;
    }

    public void setRecipesCount(Integer recipesCount) {
        this.recipesCount = recipesCount;
    }
}
