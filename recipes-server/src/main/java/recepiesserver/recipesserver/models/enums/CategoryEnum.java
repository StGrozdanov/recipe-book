package recepiesserver.recipesserver.models.enums;

public enum CategoryEnum {
    CHICKEN("Пилешко"),
    PORK("Свинско"),
    CALF("Телешко"),
    CALF_PORK("Телешко-свинско"),
    FISH("Риба"),
    OTHER_KIND_OF_MEAT("Други месни"),
    VEGAN("Вегитариански"),
    SALAD("Салати"),
    PASTA("Тестени"),
    DESSERT("Десерти"),
    OTHER("Други");

    private final String name;

    CategoryEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}