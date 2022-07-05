package recepiesserver.recipesserver.services;

import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.enums.RoleEnum;
import recepiesserver.recipesserver.repositories.RoleRepository;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public RoleEntity getAdministratorEntity() {
        return this.roleRepository.findByRole(RoleEnum.ADMINISTRATOR);
    }

    public RoleEntity getModeratorEntity() {
        return this.roleRepository.findByRole(RoleEnum.MODERATOR);
    }
}
