package recepiesserver.recipesserver.models.dtos.authDTOs;

import javax.validation.constraints.NotBlank;

public class UserPasswordDTO {
    private String password;

    public UserPasswordDTO() {
    }

    @NotBlank(message = "password cannot be blank.")
    public String getPassword() {
        return password;
    }

    public UserPasswordDTO setPassword(String password) {
        this.password = password;
        return this;
    }
}
