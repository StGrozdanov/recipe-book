package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.authDTOs.PasswordRequestCodeDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserEmailDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserPasswordDTO;
import recepiesserver.recipesserver.services.PasswordRequestService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordRequestController {
    private final PasswordRequestService passwordRequestService;

    public PasswordRequestController(PasswordRequestService passwordRequestService) {
        this.passwordRequestService = passwordRequestService;
    }

    @PostMapping(Api.FORGOTTEN_PASSWORD)
    public ResponseEntity<PasswordRequestCodeDTO> forgottenPassword(@Valid @RequestBody UserEmailDTO userEmailDTO) {
        return ResponseEntity.ok().body(this.passwordRequestService.handleForgottenPassword(userEmailDTO));
    }

    @PostMapping(Api.RESET_PASSWORD)
    public ResponseEntity<?> passwordReset(@PathVariable String code,
                                           @RequestBody(required = false) @Valid UserPasswordDTO userPasswordDTO) {
        this.passwordRequestService.resetPassword(code, userPasswordDTO);
        return ResponseEntity.ok().build();
    }
}
