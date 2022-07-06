package recepiesserver.recipesserver.models.entities;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity {
    private String username;
    private String password;
    private String email;
    private String avatarUrl;
    private String coverPhotoUrl;
    private Boolean isBlocked;
    private Set<RoleEntity> roles;
    private List<RecipeEntity> favourites;

    public UserEntity() {
        this.roles = new LinkedHashSet<>();
        this.favourites = new ArrayList<>();
        this.isBlocked = false;
    }

    @Column(nullable = false, unique = true)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(nullable = false, unique = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "avatar_url", columnDefinition = "TEXT")
    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    @Column(name = "cover_photo_url")
    public String getCoverPhotoUrl() {
        return coverPhotoUrl;
    }

    public void setCoverPhotoUrl(String coverPhotoUrl) {
        this.coverPhotoUrl = coverPhotoUrl;
    }

    @Column(name = "is_blocked")
    public Boolean getBlocked() {
        return isBlocked;
    }

    public void setBlocked(Boolean blocked) {
        isBlocked = blocked;
    }

    @ManyToMany
    @JoinColumn(nullable = false)
    public Set<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleEntity> roles) {
        this.roles = roles;
    }

    @ManyToMany
    public List<RecipeEntity> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<RecipeEntity> favourites) {
        this.favourites = favourites;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return username.equals(that.username) && email.equals(that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, email);
    }

    public void addRecipeToFavourites(RecipeEntity recipe) {
        if (this.favourites.contains(recipe)) {
            return;
        }
        this.favourites.add(recipe);
    }

    public void removeRecipeFromFavourites(RecipeEntity recipe) {
        this.favourites.remove(recipe);
    }

}