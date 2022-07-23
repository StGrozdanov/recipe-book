package recepiesserver.recipesserver.models.dtos.authDTOs;

public class PasswordRequestCodeDTO {
    private String code;
    private String username;

    public PasswordRequestCodeDTO() {
    }

    public String getCode() {
        return code;
    }

    public PasswordRequestCodeDTO setCode(String code) {
        this.code = code;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public PasswordRequestCodeDTO setUsername(String username) {
        this.username = username;
        return this;
    }
}
