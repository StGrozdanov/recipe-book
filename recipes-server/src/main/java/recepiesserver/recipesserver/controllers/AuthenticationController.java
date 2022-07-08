package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserDetailsDTO;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

    @PostMapping("/login")
    public ResponseEntity<UserDetailsDTO> Login(HttpServletRequest request) {
        String userIpAddress = getUserIpAddress(request);
        //TODO: if user is blocked he should not be able to login, but first the attempted login from the ip
        //address should be included into the user ips and the blacklist
        //TODO: attach ip address to DTO and if login is success add ip address to user entity class ip list
        return null;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDetailsDTO> Register(HttpServletRequest request) {
        String userIpAddress = getUserIpAddress(request);
        //TODO: attach ip address to DTO and if register is success, add ip address to user entity class ip list
        return null;
    }

    @PostMapping("/logout")
    public ResponseEntity<UserDetailsDTO> Logout() {
        return null;
    }

    private String getUserIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        return ip == null ? request.getRemoteAddr() : ip;
    }
}