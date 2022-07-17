package recepiesserver.recipesserver.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.models.dtos.authDTOs.AuthenticatedLoginDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeFavouritesDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.*;
import recepiesserver.recipesserver.services.UserService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(Api.GET_USER_DETAILS)
    public ResponseEntity<UserDetailsDTO> getUserDetails(@PathVariable Long userId) {
        return ResponseEntity.ok().body(this.userService.getUser(userId));
    }

    @GetMapping(Api.GET_USER_PROFILE)
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long userId) {
        return ResponseEntity.ok().body(this.userService.getUserProfile(userId));
    }

    @PutMapping(Api.EDIT_USER_PROFILE)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @userService.getUserProfileOwnerUsername(#userId)) " +
            "|| hasRole('ADMINISTRATOR')")
    public ResponseEntity<AuthenticatedLoginDTO> editUserProfile(
            @PathVariable Long userId,
            @RequestParam("data") String userData,
            @RequestParam("profileImageFile") MultipartFile profileImageFile,
            @RequestParam("coverImageFile") MultipartFile coverImageFile,
            HttpServletRequest request,
            HttpServletResponse response) throws JsonProcessingException {

        @Valid UserProfileEditDTO dto = new ObjectMapper().readValue(userData, UserProfileEditDTO.class);
        AuthenticatedLoginDTO editedProfile =
                this.userService.editUserProfile(userId, dto, profileImageFile, coverImageFile, request, response);

        return ResponseEntity.ok().body(editedProfile);
    }

    @PostMapping(Api.RECIPE_IS_IN_USER_FAVOURITES)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @userService.getUserProfileOwnerUsername(#favouritesDTO.userId))")
    public ResponseEntity<Boolean> recipeIsInUserFavourites(@RequestBody @Valid RecipeFavouritesDTO favouritesDTO,
                                                            HttpServletRequest request) {
        return ResponseEntity.ok().body(this.userService.recipeIsInUserFavourites(favouritesDTO));
    }

    @GetMapping(Api.GET_USER_FAVOURITE_RECIPES)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @userService.getUserProfileOwnerUsername(#userId))")
    public ResponseEntity<List<RecipeCatalogueDTO>> getUserFavouriteRecipes(@PathVariable Long userId,
                                                                            HttpServletRequest request) {
        return ResponseEntity.ok().body(this.userService.findUserFavouriteRecipes(userId));
    }

    @GetMapping(Api.SEARCH_IN_USER_FAVOURITES_RECIPES)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @userService.getUserProfileOwnerUsername(#id))")
    public ResponseEntity<List<RecipeCatalogueDTO>> searchUserFavouriteRecipesByName(
            @RequestParam(name = "whereName") @NotBlank String name,
            @RequestParam(name = "whereUser") Long id,
            HttpServletRequest request) {
        return ResponseEntity.ok().body(this.userService.findUserFavouriteRecipesByName(name, id));
    }

    @GetMapping(Api.USERS_COUNT)
    public ResponseEntity<UserCountDTO> totalUsersCount() {
        return ResponseEntity.ok().body(this.userService.getTotalUsersCount());
    }

    @GetMapping(Api.SEARCH_USERS_BY_USERNAME)
    public ResponseEntity<List<UserAdminPanelDTO>> searchUsersByUsername(
            @RequestParam(name = "whereUsername") @NotBlank String username) {
        return ResponseEntity.ok().body(this.userService.findUsersByUsername(username));
    }

    @PatchMapping(Api.CHANGE_USER_ROLE)
    public ResponseEntity<UserModifiedAtDTO> changeUserRole(@PathVariable Long userId,
                                                            @Valid @RequestBody UserRoleDTO userRoleDTO) {
        return ResponseEntity.ok().body(this.userService.changeUserRole(userId, userRoleDTO));
    }

    @PatchMapping(Api.BLOCK_USER)
    public ResponseEntity<UserModifiedAtDTO> blockUser(@Valid @RequestBody UserBlockDTO userBlockDTO) {
        return ResponseEntity.ok().body(this.userService.blockUser(userBlockDTO));
    }

    @PatchMapping(Api.UNBLOCK_USER)
    public ResponseEntity<UserModifiedAtDTO> unblockUser(@PathVariable Long userId) {
        return ResponseEntity.ok().body(this.userService.unblockUser(userId));
    }

    @DeleteMapping(Api.DELETE_USER)
    public ResponseEntity<UserIdDTO> deleteUser(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok().body(this.userService.deleteUser(userId));
    }

    @GetMapping(Api.USER_EXISTS_BY_USERNAME)
    public ResponseEntity<Map<String, Boolean>> userExistsByUsername(@RequestParam("username") String username) {
        boolean exists = this.userService.userWithTheSameUsernameExists(username);
        return ResponseEntity.ok().body(Map.of("usernameExists", exists));
    }

    @GetMapping(Api.USER_EXISTS_BY_EMAIL)
    public ResponseEntity<Map<String, Boolean>> userExistsByEmail(@RequestParam("email") String email) {
        boolean exists = this.userService.userWithTheSameEmailExists(email);
        return ResponseEntity.ok().body(Map.of("emailExists", exists));
    }

    @GetMapping(Api.OTHER_USER_EXISTS_BY_USERNAME)
    public ResponseEntity<Map<String, Boolean>> otherUserExistsByUsername(
            @RequestParam("username") String username,
            @RequestParam("userUsername") String userUsername) {
        boolean exists = this.userService.otherUserWithSameUsernameExists(username, userUsername);
        return ResponseEntity.ok().body(Map.of("usernameExists", exists));
    }

    @GetMapping(Api.OTHER_USER_EXISTS_BY_EMAIL)
    public ResponseEntity<Map<String, Boolean>> otherUserExistsByEmail(
            @RequestParam("email") String email,
            @RequestParam("userEmail") String userEmail) {
        boolean exists = this.userService.otherUserWithSameEmailExists(email, userEmail);
        return ResponseEntity.ok().body(Map.of("emailExists", exists));
    }

}