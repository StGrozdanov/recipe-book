package recepiesserver.recipesserver.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.*;
import recepiesserver.recipesserver.services.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
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
            @PathVariable Long userId,
            @RequestParam("data") String userData,
            @RequestParam("profileImageFile") MultipartFile profileImageFile,
            @RequestParam("coverImageFile") MultipartFile coverImageFile) throws JsonProcessingException {
        @Valid UserProfileEditDTO dto = new ObjectMapper().readValue(userData, UserProfileEditDTO.class);
        Long editedProfileId = this.userService.editUserProfile(userId, dto, profileImageFile, coverImageFile);

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

    @PatchMapping("/change-role/{userId}")
    public ResponseEntity<Long> changeUserRole(@PathVariable Long userId,
                                               @Valid @RequestBody UserRoleDTO userRoleDTO) {
        this.userService.changeUserRole(userId, userRoleDTO);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/block")
    public ResponseEntity<Long> blockUser(@Valid UserBlockDTO userBlockDTO) {
        this.userService.blockUser(userBlockDTO);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/unblock/{userId}")
    public ResponseEntity<Long> unblockUser(@PathVariable Long userId) {
        this.userService.unblockUser(userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Long> deleteUser(@PathVariable Long userId) {
        this.userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

}