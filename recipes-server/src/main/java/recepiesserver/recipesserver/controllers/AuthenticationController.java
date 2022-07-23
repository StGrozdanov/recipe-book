package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.authDTOs.*;
import recepiesserver.recipesserver.services.AuthenticationService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(Api.LOGIN)
    public ResponseEntity<AuthenticatedLoginDTO> login(HttpServletRequest request,
                                                       @RequestBody @Valid UserLoginDTO userLoginDTO) {
        String userIpAddress = getUserIpAddress(request);
        AuthenticatedLoginDTO loginResponse = this.authenticationService.login(userIpAddress, userLoginDTO);
        return ResponseEntity.ok().body(loginResponse);
    }

    @PostMapping(Api.REGISTER)
    public ResponseEntity<AuthenticatedLoginDTO> register(HttpServletRequest request,
                                                          @Valid @RequestBody UserRegisterDTO userRegisterDTO) {
        String userIpAddress = getUserIpAddress(request);
        AuthenticatedLoginDTO loginResponse = this.authenticationService.register(userIpAddress, userRegisterDTO);
        return ResponseEntity.ok().body(loginResponse);
    }

    @PostMapping(Api.LOGOUT)
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        this.authenticationService.logout(request, response);
        return ResponseEntity.ok().build();
    }

    @GetMapping(Api.REFRESH_TOKEN)
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        this.authenticationService.refreshUserToken(authorizationHeader, response);
    }

    @PostMapping(Api.CHECK_CREDENTIALS)
    public ResponseEntity<?> checkUserCredentials(@PathVariable Long userId,
                                                  @RequestBody @Valid UserPasswordDTO passwordDto) {
        this.authenticationService.checkCredentials(userId, passwordDto);
        return ResponseEntity.ok().build();
    }

    private String getUserIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        return ip == null ? request.getRemoteAddr() : ip;
    }
}