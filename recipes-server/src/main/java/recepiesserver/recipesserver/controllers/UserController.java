package recepiesserver.recipesserver.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeFavouritesDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.*;
import recepiesserver.recipesserver.services.UserService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(Api.GET_USER_DETAILS)
    public ResponseEntity<UserDetailsDTO> getUserDetails(@PathVariable Long userId) {
        Optional<UserDetailsDTO> user = this.userService.getUser(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(Api.GET_USER_PROFILE)
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long userId) {
        Optional<UserProfileDTO> user = this.userService.getUserProfile(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(Api.EDIT_USER_PROFILE)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @userService.getUserProfileOwnerUsername(#userId)) " +
            "|| hasRole('ADMINISTRATOR')")
    public ResponseEntity<Long> editUserProfile(
            @PathVariable Long userId,
            @RequestParam("data") String userData,
            @RequestParam("profileImageFile") MultipartFile profileImageFile,
            @RequestParam("coverImageFile") MultipartFile coverImageFile,
            HttpServletRequest request) throws JsonProcessingException {
        @Valid UserProfileEditDTO dto = new ObjectMapper().readValue(userData, UserProfileEditDTO.class);
        Long editedProfileId = this.userService.editUserProfile(userId, dto, profileImageFile, coverImageFile);

        return editedProfileId != null
                ? ResponseEntity.ok().body(editedProfileId)
                : ResponseEntity.badRequest().build();
    }

    @PostMapping(Api.RECIPE_IS_IN_USER_FAVOURITES)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @userService.getUserProfileOwnerUsername(#favouritesDTO.userId))")
    public ResponseEntity<Boolean> recipeIsInUserFavourites(
            @RequestBody @Valid RecipeFavouritesDTO favouritesDTO,
            HttpServletRequest request) {
        return ResponseEntity.ok().body(this.userService.recipeIsInUserFavourites(favouritesDTO));
    }

    @GetMapping(Api.GET_USER_FAVOURITE_RECIPES)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @userService.getUserProfileOwnerUsername(#userId))")
    public ResponseEntity<List<RecipeCatalogueDTO>> getUserFavouriteRecipes(
            @PathVariable Long userId,
            HttpServletRequest request) {
        return ResponseEntity.ok().body(this.userService.findUserFavouriteRecipes(userId));
    }

    @GetMapping(Api.SEARCH_IN_USER_FAVOURITES_RECIPES)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @userService.getUserProfileOwnerUsername(#id))")
    public ResponseEntity<List<RecipeCatalogueDTO>> searchUserFavouriteRecipesByName(
            @RequestParam(name = "whereName") String name,
            @RequestParam(name = "whereUser") Long id,
            HttpServletRequest request) {
        return ResponseEntity.ok().body(this.userService.findUserFavouriteRecipesByName(name, id));
    }

    @GetMapping(Api.USERS_COUNT)
    public ResponseEntity<Long> totalUsersCount() {
        return ResponseEntity.ok(this.userService.getTotalUsersCount());
    }

    @GetMapping(Api.SEARCH_USERS_BY_USERNAME)
    public ResponseEntity<List<UserAdminPanelDTO>> searchUsersByUsername(
            @RequestParam(name = "whereUsername") String username) {
        return ResponseEntity.ok().body(this.userService.findUsersByUsername(username));
    }

    @PatchMapping(Api.CHANGE_USER_ROLE)
    public ResponseEntity<Long> changeUserRole(@PathVariable Long userId,
                                               @Valid @RequestBody UserRoleDTO userRoleDTO) {
        this.userService.changeUserRole(userId, userRoleDTO);
        return ResponseEntity.ok().build();
    }

    @PatchMapping(Api.BLOCK_USER)
    public ResponseEntity<Long> blockUser(@Valid UserBlockDTO userBlockDTO) {
        this.userService.blockUser(userBlockDTO);
        return ResponseEntity.ok().build();
    }

    @PatchMapping(Api.UNBLOCK_USER)
    public ResponseEntity<Long> unblockUser(@PathVariable Long userId) {
        this.userService.unblockUser(userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(Api.DELETE_USER)
    public ResponseEntity<Long> deleteUser(@PathVariable Long userId) {
        this.userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

}