package recepiesserver.recipesserver.models.dtos.globalSearchDTOs;

public class AdminGlobalSearchDTO {
    private String name;
    private String imageUrl;
    private String resultTypeDefaultImage;
    private String resultType;

    public AdminGlobalSearchDTO() {
    }

    public AdminGlobalSearchDTO(String name, String imageUrl, String resultTypeDefaultImage, String resultType) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.resultTypeDefaultImage = resultTypeDefaultImage;
        this.resultType = resultType;
    }

    public String getName() {
        return name;
    }

    public AdminGlobalSearchDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public AdminGlobalSearchDTO setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public String getResultTypeDefaultImage() {
        return resultTypeDefaultImage;
    }

    public AdminGlobalSearchDTO setResultTypeDefaultImage(String resultTypeDefaultImage) {
        this.resultTypeDefaultImage = resultTypeDefaultImage;
        return this;
    }

    public String getResultType() {
        return resultType;
    }

    public AdminGlobalSearchDTO setResultType(String resultType) {
        this.resultType = resultType;
        return this;
    }
}
