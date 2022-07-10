package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import recepiesserver.recipesserver.models.dtos.authDTOs.AuthenticatedLoginDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserRegisterDTO;
import recepiesserver.recipesserver.services.AuthenticationService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(Api.LOGIN)
    public ResponseEntity<AuthenticatedLoginDTO> Login(HttpServletRequest request) {
        String userIpAddress = getUserIpAddress(request);
        try {
            AuthenticatedLoginDTO loginResponse = this.authenticationService.login(
                    userIpAddress,
                    request.getParameter("username"),
                    request.getParameter("password")
            );
            return ResponseEntity.ok().body(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(Api.REGISTER)
    public ResponseEntity<?> Register(HttpServletRequest request,
                                      @Valid UserRegisterDTO userRegisterDTO) {
        String userIpAddress = getUserIpAddress(request);
        this.authenticationService.register(userIpAddress, userRegisterDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping(Api.LOGOUT)
    public ResponseEntity<?> Logout(HttpServletRequest request, HttpServletResponse response) {
        this.authenticationService.logout(request, response);
        return ResponseEntity.ok().build();
    }

    @GetMapping(Api.REFRESH_TOKEN)
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        this.authenticationService.refreshUserToken(authorizationHeader, response);
    }

    private String getUserIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        return ip == null ? request.getRemoteAddr() : ip;
    }
}