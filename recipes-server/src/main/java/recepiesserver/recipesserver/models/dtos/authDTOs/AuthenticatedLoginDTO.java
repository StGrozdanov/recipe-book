package recepiesserver.recipesserver.models.dtos.authDTOs;

public class AuthenticatedLoginDTO {
    private Long id;
    private String username;
    private String email;
    private String avatarUrl;
    private String coverPhotoUrl;
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

    public String getEmail() {
        return email;
    }

    public AuthenticatedLoginDTO setEmail(String email) {
        this.email = email;
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

    public AuthenticatedLoginDTO setSessionToken(String sessionToken) {
        this.sessionToken = sessionToken;
        return this;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public AuthenticatedLoginDTO setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }
}
