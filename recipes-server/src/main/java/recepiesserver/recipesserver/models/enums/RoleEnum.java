package recepiesserver.recipesserver.models.enums;

public enum RoleEnum {
    USER("user"),
    MODERATOR("moderator"),
    ADMINISTRATOR("administrator");

    private final String name;

    RoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
