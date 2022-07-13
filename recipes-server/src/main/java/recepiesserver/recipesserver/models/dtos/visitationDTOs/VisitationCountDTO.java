package recepiesserver.recipesserver.models.dtos.visitationDTOs;

public class VisitationCountDTO {
    private Long visitationsCount;

    public VisitationCountDTO() {
    }

    public VisitationCountDTO(Long visitationsCount) {
        this.visitationsCount = visitationsCount;
    }

    public Long getVisitationsCount() {
        return visitationsCount;
    }

    public VisitationCountDTO setVisitationsCount(Long visitationsCount) {
        this.visitationsCount = visitationsCount;
        return this;
    }
}
