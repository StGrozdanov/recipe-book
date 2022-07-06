package recepiesserver.recipesserver.models.dtos.userDTOs;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class UserIdDTO {
    private Long userId;

    public UserIdDTO() {
    }

    @Positive
    @NotNull
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
