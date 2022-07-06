package recepiesserver.recipesserver.models.dtos.visitationDTOs;

import javax.validation.constraints.NotNull;
import java.time.Month;

public class VisitationDTO {
    private Month month;

    public VisitationDTO() {
    }

    @NotNull
    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }
}