package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.*;
import recepiesserver.recipesserver.services.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailsDTO> getUserDetails(@PathVariable Long userId) {
        Optional<UserDetailsDTO> user = this.userService.getUser(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long userId) {
        Optional<UserProfileDTO> user = this.userService.getUserProfile(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<Long> editUserProfile(
            @RequestBody @Valid UserProfileEditDTO userDTO,
            @PathVariable Long userId) {
        Long editedProfileId = this.userService.editUserProfile(userId, userDTO);

        return editedProfileId != null
                ? ResponseEntity.ok().body(editedProfileId)
                : ResponseEntity.badRequest().build();
    }

    @GetMapping("/searchFavouriteRecipeByName")
    public ResponseEntity<List<RecipeCatalogueDTO>> searchUserFavouriteRecipesByName(
            @RequestParam(name = "whereName") String name, @RequestBody @Valid UserIdDTO userIdDTO) {
        return ResponseEntity.ok().body(this.userService.findUserFavouriteRecipesByName(name, userIdDTO));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> totalUsersCount() {
        return ResponseEntity.ok(this.userService.getTotalUsersCount());
    }

    @GetMapping("/searchByUsername")
    public ResponseEntity<List<UserAdminPanelDTO>> searchUsersByUsername(
            @RequestParam(name = "whereUsername") String username) {
        return ResponseEntity.ok().body(this.userService.findUsersByUsername(username));
    }

}