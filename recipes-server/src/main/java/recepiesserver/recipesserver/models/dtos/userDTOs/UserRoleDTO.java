package recepiesserver.recipesserver.models.dtos.userDTOs;

import recepiesserver.recipesserver.utils.validators.validUserRoleValidator.ValidUserRole;

public class UserRoleDTO {
    private String role;

    public UserRoleDTO() {
    }

    @ValidUserRole
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}