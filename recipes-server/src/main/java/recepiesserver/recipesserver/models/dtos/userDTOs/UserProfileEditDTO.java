package recepiesserver.recipesserver.models.dtos.userDTOs;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserProfileEditDTO {
    private String username;
    private String password;
    private String email;
    private String avatarUrl;
    private String coverPhotoUrl;

    public UserProfileEditDTO() {
    }

    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 10, message = "Username length should be between 3 and 10 symbols long.")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Email(regexp = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", message = "Email should be valid.")
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

    public String getPassword() {
        return password;
    }

    public UserProfileEditDTO setPassword(String password) {
        this.password = password;
        return this;
    }
}