package recepiesserver.recipesserver.models.dtos.visitationDTOs;

public class VisitationSummaryDTO {
    private String month;
    private long visitationsCount;

    public VisitationSummaryDTO() {
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
