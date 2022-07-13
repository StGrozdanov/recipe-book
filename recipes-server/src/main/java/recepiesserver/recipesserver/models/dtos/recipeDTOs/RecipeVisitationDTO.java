package recepiesserver.recipesserver.models.dtos.recipeDTOs;

public class RecipeVisitationDTO {
    private Long visitationsCount;

    public Long getVisitationsCount() {
        return visitationsCount;
    }

    public RecipeVisitationDTO setVisitationsCount(Long visitationsCount) {
        this.visitationsCount = visitationsCount;
        return this;
    }
}
