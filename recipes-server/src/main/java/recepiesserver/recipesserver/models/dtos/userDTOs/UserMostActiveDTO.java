package recepiesserver.recipesserver.models.dtos.userDTOs;

public class UserMostActiveDTO {
    private String username;
    private String avatarUrl;
    private Integer recipesCount;
    private Integer commentsCount;
    private Integer totalPublicationsCount;

    public UserMostActiveDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Integer getRecipesCount() {
        return recipesCount;
    }

    public void setRecipesCount(Integer recipesCount) {
        this.recipesCount = recipesCount;
    }

    public Integer getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(Integer commentsCount) {
        this.commentsCount = commentsCount;
    }

    public Integer getTotalPublicationsCount() {
        return totalPublicationsCount;
    }

    public void setTotalPublicationsCount(Integer totalPublicationsCount) {
        this.totalPublicationsCount = totalPublicationsCount;
    }
}
