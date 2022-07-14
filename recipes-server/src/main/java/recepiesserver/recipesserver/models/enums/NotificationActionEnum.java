package recepiesserver.recipesserver.models.enums;

public enum NotificationActionEnum {
    CREATED_COMMENT("Публикува коментар"),
    EDITED_COMMENT("Редактира коментар"),
    CREATED_RECIPE("Публикува рецепта"),
    EDITED_RECIPE("Редактира рецепта");

    private final String name;

    NotificationActionEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
