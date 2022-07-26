package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyBoolean;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.connector.Response;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;
import recepiesserver.recipesserver.exceptions.authenticationExceptions.InvalidPasswordException;
import recepiesserver.recipesserver.exceptions.authenticationExceptions.InvalidTokenException;
import recepiesserver.recipesserver.exceptions.authenticationExceptions.LoginException;
import recepiesserver.recipesserver.exceptions.authenticationExceptions.MissingTokenException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.authDTOs.AuthenticatedLoginDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserLoginDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserPasswordDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserRegisterDTO;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.RoleEnum;
import recepiesserver.recipesserver.utils.JwtUtil;

@ContextConfiguration(classes = {AuthenticationService.class})
@ExtendWith(SpringExtension.class)
class AuthenticationServiceTest {
    @MockBean
    private AppUserDetailsService appUserDetailsService;

    @MockBean
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthenticationService authenticationService;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private ModelMapper modelMapper;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private RoleService roleService;

    @MockBean
    private UserService userService;

    @Test
    void testLogin() throws AuthenticationException {
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
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserByUsername((String) any())).thenReturn(ofResult);
        when(jwtUtil.generateSessionAndRefreshTokens((UserDetails) any())).thenReturn(new HashMap<>());

        AuthenticatedLoginDTO authenticatedLoginDTO = new AuthenticatedLoginDTO();
        authenticatedLoginDTO.setAdministrator(true);
        authenticatedLoginDTO.setAvatarUrl("https://example.org/example");
        authenticatedLoginDTO.setEmail("jane.doe@example.org");
        authenticatedLoginDTO.setId(123L);
        authenticatedLoginDTO.setModerator(true);
        authenticatedLoginDTO.setRefreshToken("ABC123");
        authenticatedLoginDTO.setSessionToken("ABC123");
        authenticatedLoginDTO.setUsername("janedoe");
        when(modelMapper.map((Object) any(), (Class<AuthenticatedLoginDTO>) any())).thenReturn(authenticatedLoginDTO);
        when(authenticationManager.authenticate((Authentication) any()))
                .thenReturn(new TestingAuthenticationToken(new User("janedoe", "iloveyou", new ArrayList<>()), "Credentials"));

        UserLoginDTO userLoginDTO = new UserLoginDTO();
        userLoginDTO.setPassword("iloveyou");
        userLoginDTO.setUsername("janedoe");
        AuthenticatedLoginDTO actualLoginResult = authenticationService.login("42 Main St", userLoginDTO);
        assertSame(authenticatedLoginDTO, actualLoginResult);
        assertFalse(actualLoginResult.getAdministrator());
        assertNull(actualLoginResult.getSessionToken());
        assertNull(actualLoginResult.getRefreshToken());
        assertFalse(actualLoginResult.getModerator());
        verify(userService).findUserByUsername((String) any());
        verify(jwtUtil).generateSessionAndRefreshTokens((UserDetails) any());
        verify(modelMapper).map((Object) any(), (Class<AuthenticatedLoginDTO>) any());
        verify(authenticationManager).authenticate((Authentication) any());
    }

    @Test
    void testLoginShouldThrowException() throws AuthenticationException {
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
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserByUsername((String) any())).thenReturn(ofResult);
        when(jwtUtil.generateSessionAndRefreshTokens((UserDetails) any())).thenReturn(new HashMap<>());
        when(modelMapper.map((Object) any(), (Class<AuthenticatedLoginDTO>) any()))
                .thenThrow(new LoginException("An error occurred"));
        when(authenticationManager.authenticate((Authentication) any()))
                .thenReturn(new TestingAuthenticationToken(new User("janedoe", "iloveyou", new ArrayList<>()), "Credentials"));

        UserLoginDTO userLoginDTO = new UserLoginDTO();
        userLoginDTO.setPassword("iloveyou");
        userLoginDTO.setUsername("janedoe");
        assertThrows(LoginException.class, () -> authenticationService.login("42 Main St", userLoginDTO));
        verify(userService).findUserByUsername((String) any());
        verify(jwtUtil).generateSessionAndRefreshTokens((UserDetails) any());
        verify(modelMapper).map((Object) any(), (Class<AuthenticatedLoginDTO>) any());
        verify(authenticationManager).authenticate((Authentication) any());
    }

    @Test
    void testRegister() {
        doNothing().when(userService).saveNewUser((UserEntity) any());

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
        when(modelMapper.map((Object) any(), (Class<UserEntity>) any())).thenReturn(userEntity);

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);
        when(passwordEncoder.encode((CharSequence) any())).thenThrow(new LoginException("An error occurred"));

        UserRegisterDTO userRegisterDTO = new UserRegisterDTO();
        userRegisterDTO.setEmail("jane.doe@example.org");
        userRegisterDTO.setPassword("iloveyou");
        userRegisterDTO.setRepeatPassword("iloveyou");
        userRegisterDTO.setUsername("janedoe");
        assertThrows(LoginException.class, () -> authenticationService.register("42 Main St", userRegisterDTO));
        verify(modelMapper).map((Object) any(), (Class<UserEntity>) any());
        verify(passwordEncoder).encode((CharSequence) any());
    }

    @Test
    void testLogout() {
        DefaultMultipartHttpServletRequest defaultMultipartHttpServletRequest = mock(
                DefaultMultipartHttpServletRequest.class);
        when(defaultMultipartHttpServletRequest.getSession(anyBoolean())).thenReturn(new MockHttpSession());
        authenticationService.logout(defaultMultipartHttpServletRequest, new Response());
        verify(defaultMultipartHttpServletRequest).getSession(anyBoolean());
    }

    @Test
    void testCheckUserCredentials() throws AuthenticationException {
        User user = new User("janedoe", "iloveyou", new ArrayList<>());

        when(authenticationManager.authenticate((Authentication) any()))
                .thenReturn(new TestingAuthenticationToken(user, "Credentials"));
        assertSame(user, authenticationService.checkUserCredentials("janedoe", "iloveyou"));
        verify(authenticationManager).authenticate((Authentication) any());
    }

    @Test
    void testCheckUserCredentialsShouldThrow() throws AuthenticationException {
        when(authenticationManager.authenticate((Authentication) any())).thenThrow(new LoginException("An error occurred"));
        assertThrows(LoginException.class, () -> authenticationService.checkUserCredentials("janedoe", "iloveyou"));
        verify(authenticationManager).authenticate((Authentication) any());
    }

    @Test
    void testRefreshUserTokenShouldThrowUponMissingToken() {
        assertThrows(MissingTokenException.class, () -> authenticationService.refreshUserToken("JaneDoe", new Response()));
    }

    @Test
    void testRefreshUserTokenShouldThrowUponInvalidToken() throws UsernameNotFoundException {
        when(jwtUtil.extractUsername((String) any())).thenReturn("janedoe");
        when(jwtUtil.generateSessionToken((UserDetails) any())).thenReturn("ABC123");
        when(jwtUtil.getTokenValue((String) any())).thenReturn("ABC123");
        when(appUserDetailsService.loadUserByUsername((String) any()))
                .thenReturn(new User("janedoe", "iloveyou", new ArrayList<>()));
        assertThrows(InvalidTokenException.class, () -> authenticationService.refreshUserToken("Bearer ", new Response()));
        verify(jwtUtil).extractUsername((String) any());
        verify(jwtUtil).generateSessionToken((UserDetails) any());
        verify(jwtUtil).getTokenValue((String) any());
        verify(appUserDetailsService).loadUserByUsername((String) any());
    }

    @Test
    void testRefreshUserTokenGeneratesCorrectly() throws UsernameNotFoundException {
        when(jwtUtil.extractUsername((String) any())).thenReturn("janedoe");
        when(jwtUtil.generateSessionToken((UserDetails) any())).thenReturn("ABC123");
        when(jwtUtil.getTokenValue((String) any())).thenReturn("ABC123");
        when(appUserDetailsService.loadUserByUsername((String) any()))
                .thenReturn(new User("janedoe", "iloveyou", new ArrayList<>()));
        MockHttpServletResponse mockHttpServletResponse = new MockHttpServletResponse();
        authenticationService.refreshUserToken("Bearer ", mockHttpServletResponse);
        verify(jwtUtil).extractUsername((String) any());
        verify(jwtUtil).generateSessionToken((UserDetails) any());
        verify(jwtUtil).getTokenValue((String) any());
        verify(appUserDetailsService).loadUserByUsername((String) any());
        assertNull(mockHttpServletResponse.getRedirectedUrl());
        assertEquals(1, mockHttpServletResponse.getHeaderNames().size());
        assertEquals("application/json", mockHttpServletResponse.getContentType());
    }

    @Test
    void testRefreshUserTokenThrowsUponMissingRefreshToken() throws UsernameNotFoundException {
        when(jwtUtil.extractUsername((String) any())).thenReturn("janedoe");
        when(jwtUtil.generateSessionToken((UserDetails) any())).thenReturn("ABC123");
        when(jwtUtil.getTokenValue((String) any())).thenReturn("ABC123");
        when(appUserDetailsService.loadUserByUsername((String) any())).thenThrow(new LoginException("An error occurred"));
        assertThrows(MissingTokenException.class, () -> authenticationService.refreshUserToken(null, new Response()));
    }

    @Test
    void testHandleInvalidPassword() {
        when(passwordEncoder.matches((CharSequence) any(), (String) any())).thenReturn(true);
        authenticationService.handleInvalidPassword("iloveyou", "secret");
        verify(passwordEncoder).matches((CharSequence) any(), (String) any());
    }

    @Test
    void testHandleInvalidPasswordShouldThrowInvalidPasswordExceptionUponInvalidPassword() {
        when(passwordEncoder.matches((CharSequence) any(), (String) any())).thenReturn(false);
        assertThrows(InvalidPasswordException.class,
                () -> authenticationService.handleInvalidPassword("iloveyou", "secret"));
        verify(passwordEncoder).matches((CharSequence) any(), (String) any());
    }

    @Test
    void testHandleInvalidPasswordShouldThrowLoginException() {
        when(passwordEncoder.matches((CharSequence) any(), (String) any()))
                .thenThrow(new LoginException("An error occurred"));
        assertThrows(LoginException.class, () -> authenticationService.handleInvalidPassword("iloveyou", "secret"));
        verify(passwordEncoder).matches((CharSequence) any(), (String) any());
    }

    @Test
    void testSetNewUserPassword() {
        when(passwordEncoder.encode((CharSequence) any())).thenReturn("secret");

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
        UserEntity actualSetNewUserPasswordResult = authenticationService.setNewUserPassword(userEntity, "iloveyou");
        assertSame(userEntity, actualSetNewUserPasswordResult);
        assertEquals("secret", actualSetNewUserPasswordResult.getPassword());
        verify(passwordEncoder).encode((CharSequence) any());
    }

    @Test
    void testSetNewUserPasswordShouldThrow() {
        when(passwordEncoder.encode((CharSequence) any())).thenThrow(new LoginException("An error occurred"));

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
        assertThrows(LoginException.class, () -> authenticationService.setNewUserPassword(userEntity, "iloveyou"));
        verify(passwordEncoder).encode((CharSequence) any());
    }

    @Test
    void testCheckCredentials() {
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
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        when(passwordEncoder.matches((CharSequence) any(), (String) any())).thenReturn(true);

        UserPasswordDTO userPasswordDTO = new UserPasswordDTO();
        userPasswordDTO.setPassword("iloveyou");
        authenticationService.checkCredentials(123L, userPasswordDTO);
        verify(userService).findUserById((Long) any());
        verify(passwordEncoder).matches((CharSequence) any(), (String) any());
    }

    @Test
    void testCheckCredentialsShouldThrow() {
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
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        when(passwordEncoder.matches((CharSequence) any(), (String) any()))
                .thenThrow(new LoginException("An error occurred"));

        UserPasswordDTO userPasswordDTO = new UserPasswordDTO();
        userPasswordDTO.setPassword("iloveyou");
        assertThrows(LoginException.class, () -> authenticationService.checkCredentials(123L, userPasswordDTO));
        verify(userService).findUserById((Long) any());
        verify(passwordEncoder).matches((CharSequence) any(), (String) any());
    }

    @Test
    void testCheckCredentialsShouldThrowUponInvalidUser() {
        when(userService.findUserById((Long) any())).thenReturn(Optional.empty());
        when(passwordEncoder.matches((CharSequence) any(), (String) any())).thenReturn(true);

        UserPasswordDTO userPasswordDTO = new UserPasswordDTO();
        userPasswordDTO.setPassword("iloveyou");
        assertThrows(UserNotFoundException.class, () -> authenticationService.checkCredentials(123L, userPasswordDTO));
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testCheckCredentialsShouldThrowUponInvalidPassword() {
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
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        when(passwordEncoder.matches((CharSequence) any(), (String) any())).thenReturn(false);

        UserPasswordDTO userPasswordDTO = new UserPasswordDTO();
        userPasswordDTO.setPassword("iloveyou");
        assertThrows(InvalidPasswordException.class, () -> authenticationService.checkCredentials(123L, userPasswordDTO));
        verify(userService).findUserById((Long) any());
        verify(passwordEncoder).matches((CharSequence) any(), (String) any());
    }
}

