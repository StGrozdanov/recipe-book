package recepiesserver.recipesserver.models.enums;

public enum RoleEnum {
    USER("User"),
    MODERATOR("Moderator"),
    ADMINISTRATOR("Administrator");

    private final String name;

    RoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
