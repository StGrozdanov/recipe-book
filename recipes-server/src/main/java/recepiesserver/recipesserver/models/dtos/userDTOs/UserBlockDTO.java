package recepiesserver.recipesserver.models.dtos.userDTOs;

import javax.validation.constraints.NotBlank;

public class UserBlockDTO {
    private Long id;
    private String reason;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotBlank(message = "Block reasoning is required.")
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
