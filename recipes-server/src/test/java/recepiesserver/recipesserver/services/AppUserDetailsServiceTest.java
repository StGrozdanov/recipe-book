package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.RoleEnum;
import recepiesserver.recipesserver.repositories.UserRepository;

class AppUserDetailsServiceTest {

    @Test
    void testLoadUserByUsername() throws UsernameNotFoundException {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        UserRepository userRepository = mock(UserRepository.class);
        when(userRepository.findByUsername((String) any())).thenReturn(Optional.of(userEntity));
        UserDetails actualLoadUserByUsernameResult = (new AppUserDetailsService(userRepository)).loadUserByUsername("foo");
        assertTrue(actualLoadUserByUsernameResult.getAuthorities().isEmpty());
        assertTrue(actualLoadUserByUsernameResult.isEnabled());
        assertTrue(actualLoadUserByUsernameResult.isCredentialsNonExpired());
        assertTrue(actualLoadUserByUsernameResult.isAccountNonLocked());
        assertTrue(actualLoadUserByUsernameResult.isAccountNonExpired());
        assertEquals("janedoe", actualLoadUserByUsernameResult.getUsername());
        assertEquals("iloveyou", actualLoadUserByUsernameResult.getPassword());
        verify(userRepository).findByUsername((String) any());
    }

    @Test
    void testLoadUserByUsernameWithUserRole() throws UsernameNotFoundException {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);

        ArrayList<RoleEntity> roleEntityList = new ArrayList<>();
        roleEntityList.add(roleEntity);

        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(roleEntityList);
        userEntity.setUsername("janedoe");
        UserRepository userRepository = mock(UserRepository.class);
        when(userRepository.findByUsername((String) any())).thenReturn(Optional.of(userEntity));
        UserDetails actualLoadUserByUsernameResult = (new AppUserDetailsService(userRepository)).loadUserByUsername("foo");
        assertEquals(1, actualLoadUserByUsernameResult.getAuthorities().size());
        assertTrue(actualLoadUserByUsernameResult.isEnabled());
        assertTrue(actualLoadUserByUsernameResult.isCredentialsNonExpired());
        assertTrue(actualLoadUserByUsernameResult.isAccountNonLocked());
        assertTrue(actualLoadUserByUsernameResult.isAccountNonExpired());
        assertEquals("janedoe", actualLoadUserByUsernameResult.getUsername());
        assertEquals("iloveyou", actualLoadUserByUsernameResult.getPassword());
        verify(userRepository).findByUsername((String) any());
    }

    @Test
    void testLoadUserByUsernameWithUserRoles() throws UsernameNotFoundException {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);

        RoleEntity secondRoleEntity = new RoleEntity();
        secondRoleEntity.setId(123L);
        secondRoleEntity.setRole(RoleEnum.USER);

        ArrayList<RoleEntity> roleEntityList = new ArrayList<>();
        roleEntityList.add(secondRoleEntity);
        roleEntityList.add(roleEntity);

        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(roleEntityList);
        userEntity.setUsername("janedoe");
        UserRepository userRepository = mock(UserRepository.class);
        when(userRepository.findByUsername((String) any())).thenReturn(Optional.of(userEntity));
        UserDetails actualLoadUserByUsernameResult = (new AppUserDetailsService(userRepository)).loadUserByUsername("foo");
        assertEquals(1, actualLoadUserByUsernameResult.getAuthorities().size());
        assertTrue(actualLoadUserByUsernameResult.isEnabled());
        assertTrue(actualLoadUserByUsernameResult.isCredentialsNonExpired());
        assertTrue(actualLoadUserByUsernameResult.isAccountNonLocked());
        assertTrue(actualLoadUserByUsernameResult.isAccountNonExpired());
        assertEquals("janedoe", actualLoadUserByUsernameResult.getUsername());
        assertEquals("iloveyou", actualLoadUserByUsernameResult.getPassword());
        verify(userRepository).findByUsername((String) any());
    }

    @Test
    void testLoadUserByUsernameThrowsException() throws UsernameNotFoundException {
        UserRepository userRepository = mock(UserRepository.class);
        when(userRepository.findByUsername((String) any())).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class,
                () -> (new AppUserDetailsService(userRepository)).loadUserByUsername("foo"));
        verify(userRepository).findByUsername((String) any());
    }

    @Test
    void testLoadUserByUsernameUsernameDoesNotThrowExceptionUnderRightConditions() throws UsernameNotFoundException {
        UserRepository userRepository = mock(UserRepository.class);
        when(userRepository.findByUsername((String) any()))
                .thenThrow(new UsernameNotFoundException("User with username %s not found!"));
        assertThrows(UsernameNotFoundException.class,
                () -> (new AppUserDetailsService(userRepository)).loadUserByUsername("foo"));
        verify(userRepository).findByUsername((String) any());
    }

    @Test
    void testMap() {
        AppUserDetailsService appUserDetailsService = new AppUserDetailsService(mock(UserRepository.class));

        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        UserDetails actualMapResult = appUserDetailsService.map(userEntity);
        assertTrue(actualMapResult.getAuthorities().isEmpty());
        assertTrue(actualMapResult.isEnabled());
        assertTrue(actualMapResult.isCredentialsNonExpired());
        assertTrue(actualMapResult.isAccountNonLocked());
        assertTrue(actualMapResult.isAccountNonExpired());
        assertEquals("janedoe", actualMapResult.getUsername());
        assertEquals("iloveyou", actualMapResult.getPassword());
    }
}

