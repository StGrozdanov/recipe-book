package recepiesserver.recipesserver.models.dtos.globalSearchDTOs;

public class AdminGlobalSearchDTO {
    private String name;
    private String resultType;

    public AdminGlobalSearchDTO() {
    }

    public AdminGlobalSearchDTO(String name, String resultType) {
        this.name = name;
        this.resultType = resultType;
    }

    public String getName() {
        return name;
    }

    public AdminGlobalSearchDTO setName(String name) {
        this.name = name;
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
