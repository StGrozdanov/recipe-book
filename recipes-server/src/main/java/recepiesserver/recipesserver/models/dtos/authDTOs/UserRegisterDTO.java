package recepiesserver.recipesserver.models.dtos.authDTOs;

import recepiesserver.recipesserver.utils.validators.matchingFieldsValidator.FieldsMatcher;
import recepiesserver.recipesserver.utils.validators.uniqueEmailValidator.UniqueEmail;
import recepiesserver.recipesserver.utils.validators.uniqueUsernameValidator.UniqueUsername;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@FieldsMatcher(
        firstField = "password",
        secondField = "repeatPassword"
)
public class UserRegisterDTO {
    private String email;
    private String username;
    private String password;
    private String repeatPassword;

    public UserRegisterDTO() {
    }

    @UniqueEmail
    @Email(regexp = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", message = "Email is invalid.")
    public String getEmail() {
        return email;
    }

    public UserRegisterDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getUsername() {
        return username;
    }

    @UniqueUsername
    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 10, message = "Username length should be between 3 and 10 symbols long.")
    public UserRegisterDTO setUsername(String username) {
        this.username = username;
        return this;
    }

    @NotBlank(message = "Password is required.")
    @Size(min = 4, message = "Password length should be minimum 4 symbols long.")
    public String getPassword() {
        return password;
    }

    public UserRegisterDTO setPassword(String password) {
        this.password = password;
        return this;
    }

    @NotBlank(message = "Password is required.")
    @Size(min = 4, message = "Password length should be minimum 4 symbols long.")
    public String getRepeatPassword() {
        return repeatPassword;
    }

    public UserRegisterDTO setRepeatPassword(String repeatPassword) {
        this.repeatPassword = repeatPassword;
        return this;
    }
}
