package recepiesserver.recipesserver.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.enums.RoleEnum;
import recepiesserver.recipesserver.repositories.RoleRepository;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ContextConfiguration(classes = {RoleService.class})
@ExtendWith(SpringExtension.class)
public class RoleServiceTest {

    @Autowired
    RoleService roleService;

    @MockBean
    RoleRepository roleRepository;

    @Test
    public void testGetAdministratorEntity() {
        RoleEnum roleEnum = RoleEnum.ADMINISTRATOR;
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setRole(roleEnum);
        roleEntity.setId(101L);

        when(roleRepository.findByRole(roleEnum)).thenReturn(roleEntity);

        RoleEntity administratorEntity = roleService.getAdministratorEntity();

        assertEquals(administratorEntity.getRole(), roleEntity.getRole());
        verify(roleRepository).findByRole((RoleEnum) any());
    }

    @Test
    public void testGetModeratorEntity() {
        RoleEnum roleEnum = RoleEnum.MODERATOR;
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setRole(roleEnum);
        roleEntity.setId(101L);

        when(roleRepository.findByRole(roleEnum)).thenReturn(roleEntity);

        RoleEntity moderatorEntity = roleService.getModeratorEntity();

        assertEquals(moderatorEntity.getRole(), roleEntity.getRole());
        verify(roleRepository).findByRole((RoleEnum) any());
    }

    @Test
    public void testGetUserEntity() {
        RoleEnum roleEnum = RoleEnum.USER;
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setRole(roleEnum);
        roleEntity.setId(101L);

        when(roleRepository.findByRole(roleEnum)).thenReturn(roleEntity);

        RoleEntity userEntity = roleService.getUserEntity();

        assertEquals(userEntity.getRole(), roleEntity.getRole());
        verify(roleRepository).findByRole((RoleEnum) any());
    }


}
