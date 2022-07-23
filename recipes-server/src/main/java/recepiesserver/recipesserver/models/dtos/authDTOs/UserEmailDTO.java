package recepiesserver.recipesserver.models.dtos.authDTOs;

import javax.validation.constraints.Email;

public class UserEmailDTO {
    private String email;

    public UserEmailDTO() {
    }

    @Email(regexp = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", message = "Email format is invalid.")
    public String getEmail() {
        return email;
    }

    public UserEmailDTO setEmail(String email) {
        this.email = email;
        return this;
    }
}
