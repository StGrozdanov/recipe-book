package recepiesserver.recipesserver.models.dtos.userDTOs;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserPasswordChangeDTO {
    private String oldPassword;
    private String newPassword;

    public UserPasswordChangeDTO() {
    }

    @NotBlank(message = "Password is required.")
    public String getOldPassword() {
        return oldPassword;
    }

    public UserPasswordChangeDTO setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
        return this;
    }

    @NotBlank(message = "Password is required.")
    @Size(min = 4, message = "Password length should be minimum 4 symbols long.")
    public String getNewPassword() {
        return newPassword;
    }

    public UserPasswordChangeDTO setNewPassword(String newPassword) {
        this.newPassword = newPassword;
        return this;
    }
}
