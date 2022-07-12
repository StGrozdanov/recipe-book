package recepiesserver.recipesserver.models.dtos.authDTOs;

public class AuthenticatedLoginDTO {
    private Long id;
    private String username;
    private String avatarUrl;
    private String coverPhotoUrl;
    private String email;
    private Boolean isAdministrator;
    private Boolean isModerator;
    private String sessionToken;
    private String refreshToken;

    public AuthenticatedLoginDTO() {
    }

    public Long getId() {
        return id;
    }

    public AuthenticatedLoginDTO setId(Long id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public AuthenticatedLoginDTO setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public AuthenticatedLoginDTO setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
        return this;
    }

    public String getCoverPhotoUrl() {
        return coverPhotoUrl;
    }

    public AuthenticatedLoginDTO setCoverPhotoUrl(String coverPhotoUrl) {
        this.coverPhotoUrl = coverPhotoUrl;
        return this;
    }

    public String getSessionToken() {
        return sessionToken;
    }

    public void setSessionToken(String sessionToken) {
        this.sessionToken = sessionToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Boolean getAdministrator() {
        return isAdministrator;
    }

    public AuthenticatedLoginDTO setAdministrator(Boolean administrator) {
        isAdministrator = administrator;
        return this;
    }

    public Boolean getModerator() {
        return isModerator;
    }

    public void setModerator(Boolean moderator) {
        isModerator = moderator;
    }

    public String getEmail() {
        return email;
    }

    public AuthenticatedLoginDTO setEmail(String email) {
        this.email = email;
        return this;
    }
}
