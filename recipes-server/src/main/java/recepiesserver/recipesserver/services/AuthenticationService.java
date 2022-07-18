package recepiesserver.recipesserver.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.exceptions.authenticationExceptions.InvalidPasswordException;
import recepiesserver.recipesserver.exceptions.authenticationExceptions.InvalidTokenException;
import recepiesserver.recipesserver.exceptions.authenticationExceptions.LoginException;
import recepiesserver.recipesserver.exceptions.authenticationExceptions.MissingTokenException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.authDTOs.AuthenticatedLoginDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserLoginDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserPasswordDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserRegisterDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserDetailsDTO;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.utils.JwtUtil;
import recepiesserver.recipesserver.utils.constants.Authorities;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
public class AuthenticationService {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final AppUserDetailsService userDetailsService;

    public AuthenticationService(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, ModelMapper modelMapper, PasswordEncoder passwordEncoder, RoleService roleService, AppUserDetailsService userDetailsService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.userDetailsService = userDetailsService;
    }

    @Transactional
    public AuthenticatedLoginDTO login(String userIpAddress, UserLoginDTO userLoginDTO) {
        User user = this.checkUserCredentials(userLoginDTO.getUsername(), userLoginDTO.getPassword());

        boolean isAdministrator = this.checkForAuthority(user, Authorities.ADMINISTRATOR);
        boolean isModerator = this.checkForAuthority(user, Authorities.MODERATOR);

        Map<String, String> tokens = this.jwtUtil.generateSessionAndRefreshTokens(user);

        UserEntity userEntity = this.userService.findUserByUsername(userLoginDTO.getUsername()).orElseThrow();

        userEntity.getIpAddresses().add(userIpAddress);

        AuthenticatedLoginDTO authResponse = this.modelMapper.map(userEntity, AuthenticatedLoginDTO.class);

        this.appendTokensAndRolesToTheResponse(isAdministrator, isModerator, tokens, authResponse);

        return authResponse;
    }

    @Transactional
    public AuthenticatedLoginDTO register(String userIpAddress, UserRegisterDTO userRegisterDTO) {
        UserEntity newUser = this.modelMapper.map(userRegisterDTO, UserEntity.class);
        String encodedPassword = this.passwordEncoder.encode(userRegisterDTO.getPassword());

        newUser.setPassword(encodedPassword);
        RoleEntity userRole = this.roleService.getUserEntity();
        newUser.getRoles().add(userRole);

        this.userService.saveNewUser(newUser);

        UserLoginDTO loginDTO = this.modelMapper.map(userRegisterDTO, UserLoginDTO.class);
        return this.login(userIpAddress, loginDTO);
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextHolder.getContext().setAuthentication(null);
        SecurityContextHolder.clearContext();

        SecurityContextLogoutHandler context = new SecurityContextLogoutHandler();
        context.logout(request, response, null);
    }

    public User checkUserCredentials(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);

        Authentication authentication;

        try {
            authentication = this.authenticationManager.authenticate(authenticationToken);
        } catch (Exception e) {
            throw new LoginException(ExceptionMessages.INVALID_CREDENTIALS);
        }

        return (User) authentication.getPrincipal();
    }

    @Transactional
    public void refreshUserToken(String authorizationHeader, HttpServletResponse response) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refreshToken = this.jwtUtil.getTokenValue(authorizationHeader);

                String username = this.jwtUtil.extractUsername(authorizationHeader);
                UserDetails user = this.userDetailsService.loadUserByUsername(username);

                String sessionToken = this.jwtUtil.generateSessionToken(user);

                this.appendRefreshedTokenToTheResponse(response, refreshToken, sessionToken);
            } catch (Exception e) {
                throw new InvalidTokenException(ExceptionMessages.INVALID_TOKEN);
            }
        } else {
            throw new MissingTokenException(ExceptionMessages.MISSING_TOKEN);
        }
    }

    public void handleInvalidPassword(String rawPassword, String encodedPassword) {
        boolean matches = this.passwordEncoder.matches(rawPassword, encodedPassword);

        if (!matches) {
            throw new InvalidPasswordException(ExceptionMessages.INVALID_PASSWORD);
        }
    }

    private void appendRefreshedTokenToTheResponse(HttpServletResponse response,
                                                   String refreshToken,
                                                   String sessionToken) throws IOException {
        Map<String, String> tokens = new HashMap<>();
        tokens.put("sessionToken", sessionToken);
        tokens.put("refreshToken", refreshToken);

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

    private boolean checkForAuthority(User user, String role) {
        return user.getAuthorities().contains(new SimpleGrantedAuthority(role));
    }

    private void appendTokensAndRolesToTheResponse(boolean isAdministrator,
                                                   boolean isModerator,
                                                   Map<String, String> tokens,
                                                   AuthenticatedLoginDTO authResponse) {
        authResponse.setSessionToken(tokens.get("session_token"));
        authResponse.setRefreshToken(tokens.get("refresh_token"));
        authResponse.setModerator(isModerator);
        authResponse.setAdministrator(isAdministrator);
    }

    public UserEntity setNewUserPassword(UserEntity oldUserInfo, String rawPassword) {
        String encodedPassword = this.passwordEncoder.encode(rawPassword);
        oldUserInfo.setPassword(encodedPassword);
        return oldUserInfo;
    }

    public void checkCredentials(Long userId, UserPasswordDTO passwordDto) {
        UserEntity user = this.userService
                .findUserById(userId)
                .orElseThrow(() -> new UserNotFoundException(ExceptionMessages.USER_NOT_FOUND));

        String password = passwordDto.getPassword();

        boolean passwordMatch = this.passwordEncoder.matches(password, user.getPassword());

        if (!passwordMatch) {
            throw new InvalidPasswordException(ExceptionMessages.INVALID_PASSWORD);
        }
    }
}