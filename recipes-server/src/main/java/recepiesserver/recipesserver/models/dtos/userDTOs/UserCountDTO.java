package recepiesserver.recipesserver.models.dtos.userDTOs;

public class UserCountDTO {
    private Long usersCount;

    public Long getUsersCount() {
        return usersCount;
    }

    public UserCountDTO setUsersCount(Long usersCount) {
        this.usersCount = usersCount;
        return this;
    }
}
