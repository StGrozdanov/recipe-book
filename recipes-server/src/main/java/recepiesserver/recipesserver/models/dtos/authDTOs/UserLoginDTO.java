package recepiesserver.recipesserver.models.dtos.authDTOs;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserLoginDTO {
    private String username;
    private String password;

    @NotBlank(message = "Invalid username/password")
    @Size(min = 3, max = 10, message = "Invalid username/password")
    public String getUsername() {
        return username;
    }

    public UserLoginDTO setUsername(String username) {
        this.username = username;
        return this;
    }

    @NotBlank(message = "Invalid username/password")
    public String getPassword() {
        return password;
    }

    public UserLoginDTO setPassword(String password) {
        this.password = password;
        return this;
    }
}
