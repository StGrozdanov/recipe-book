package recepiesserver.recipesserver.models.dtos.userDTOs;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class UserIdDTO {
    private Long userId;

    public UserIdDTO() {
    }

    public UserIdDTO(Long userId) {
        this.userId = userId;
    }

    @Positive
    @NotNull
    public Long getUserId() {
        return userId;
    }

    public UserIdDTO setUserId(Long userId) {
        this.userId = userId;
        return null;
    }
}
