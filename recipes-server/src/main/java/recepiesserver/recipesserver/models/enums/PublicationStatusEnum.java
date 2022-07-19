package recepiesserver.recipesserver.models.enums;

public enum PublicationStatusEnum {
    PENDING("изчакваща"), APPROVED("одобрена");

    private final String name;

    PublicationStatusEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
