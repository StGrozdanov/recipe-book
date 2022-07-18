package recepiesserver.recipesserver.models.enums;

public enum RoleEnum {
    USER("Потребител"),
    MODERATOR("Модератор"),
    ADMINISTRATOR("Администратор");

    private final String name;

    RoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
