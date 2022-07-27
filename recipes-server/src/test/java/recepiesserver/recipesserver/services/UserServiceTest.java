package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.connector.Response;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.events.DeleteUserEvent;
import recepiesserver.recipesserver.events.GlobalSearchEvent;
import recepiesserver.recipesserver.exceptions.userExceptions.UserAlreadyBlockedException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeFavouritesDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserBlockDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserDetailsDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserPasswordChangeDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserProfileEditDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserRoleDTO;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.models.enums.RoleEnum;
import recepiesserver.recipesserver.repositories.UserRepository;

@ContextConfiguration(classes = {UserService.class})
@ExtendWith(SpringExtension.class)
class UserServiceTest {
    @MockBean
    private AmazonS3Service amazonS3Service;

    @MockBean
    private ApplicationEventPublisher applicationEventPublisher;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private ModelMapper modelMapper;

    @MockBean
    private RecipeService recipeService;

    @MockBean
    private RoleService roleService;

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    void testFindUserById() {
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
        when(userRepository.findById((Long) any())).thenReturn(ofResult);
        Optional<UserEntity> actualFindUserByIdResult = userService.findUserById(123L);
        assertSame(ofResult, actualFindUserByIdResult);
        assertTrue(actualFindUserByIdResult.isPresent());
        verify(userRepository).findById((Long) any());
    }

    @Test
    void testFindUserByIdCaseTwo() {
        when(userRepository.findById((Long) any())).thenThrow(new UserAlreadyBlockedException("An error occurred"));
        assertThrows(UserAlreadyBlockedException.class, () -> userService.findUserById(123L));
        verify(userRepository).findById((Long) any());
    }

    @Test
    void testGetUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        userEntity.setFavourites(recipeEntityList);
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setAvatarUrl("https://example.org/example");
        userDetailsDTO.setEmail("jane.doe@example.org");
        userDetailsDTO.setRecipes(new ArrayList<>());
        userDetailsDTO.setRecipesCount(3);
        userDetailsDTO.setUsername("janedoe");
        when(modelMapper.map((Object) any(), (Class<UserDetailsDTO>) any())).thenReturn(userDetailsDTO);
        when(recipeService.findRecipesByUser((Long) any())).thenReturn(new ArrayList<>());
        UserDetailsDTO actualUser = userService.getUser(123L);
        assertSame(userDetailsDTO, actualUser);
        assertEquals(0, actualUser.getRecipesCount().intValue());
        assertEquals(recipeEntityList, actualUser.getRecipes());
        verify(userRepository).findById((Long) any());
        verify(modelMapper).map((Object) any(), (Class<UserDetailsDTO>) any());
        verify(recipeService).findRecipesByUser((Long) any());
    }

    @Test
    void testChangeUserRole() {
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

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity1);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);

        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("Role");
        userService.changeUserRole(123L, userRoleDTO);
        verify(userRepository).save((UserEntity) any());
        verify(userRepository).findById((Long) any());
        verify(roleService).getUserEntity();
    }

    @Test
    void testChangeUserRoleCaseTwo() {
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
        when(userRepository.save((UserEntity) any())).thenThrow(new UserAlreadyBlockedException("An error occurred"));
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);

        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("Role");
        assertThrows(UserAlreadyBlockedException.class, () -> userService.changeUserRole(123L, userRoleDTO));
        verify(userRepository).save((UserEntity) any());
        verify(userRepository).findById((Long) any());
        verify(roleService).getUserEntity();
    }

    @Test
    void testChangeUserRoleCaseThree() {
        UserEntity userEntity = mock(UserEntity.class);
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
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

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity1);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);

        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("Role");
        userService.changeUserRole(123L, userRoleDTO);
        verify(userRepository).save((UserEntity) any());
        verify(userRepository).findById((Long) any());
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity, atLeast(1)).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
        verify(roleService).getUserEntity();
    }

    @Test
    void testChangeUserRoleCaseFour() {
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
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity);
        when(userRepository.findById((Long) any())).thenReturn(Optional.empty());
        UserEntity userEntity1 = mock(UserEntity.class);
        doNothing().when(userEntity1).setId((Long) any());
        doNothing().when(userEntity1).setAvatarUrl((String) any());
        doNothing().when(userEntity1).setBlocked((Boolean) any());
        doNothing().when(userEntity1).setEmail((String) any());
        doNothing().when(userEntity1).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity1).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity1).setPassword((String) any());
        doNothing().when(userEntity1).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity1).setUsername((String) any());
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);

        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("Role");
        assertThrows(UserNotFoundException.class, () -> userService.changeUserRole(123L, userRoleDTO));
        verify(userRepository).findById((Long) any());
        verify(userEntity1).setId((Long) any());
        verify(userEntity1).setAvatarUrl((String) any());
        verify(userEntity1).setBlocked((Boolean) any());
        verify(userEntity1).setEmail((String) any());
        verify(userEntity1).setFavourites((List<RecipeEntity>) any());
        verify(userEntity1).setIpAddresses((Set<String>) any());
        verify(userEntity1).setPassword((String) any());
        verify(userEntity1).setRoles((List<RoleEntity>) any());
        verify(userEntity1).setUsername((String) any());
    }

    @Test
    void testChangeUserRoleCaseFive() {
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

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity1);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);

        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("Role");
        userService.changeUserRole(123L, userRoleDTO);
        verify(userRepository).save((UserEntity) any());
        verify(userRepository).findById((Long) any());
        verify(roleService).getUserEntity();
    }

    @Test
    void testChangeUserRoleCaseSix() {
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
        when(userRepository.save((UserEntity) any())).thenThrow(new UserAlreadyBlockedException("An error occurred"));
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);

        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("Role");
        assertThrows(UserAlreadyBlockedException.class, () -> userService.changeUserRole(123L, userRoleDTO));
        verify(userRepository).save((UserEntity) any());
        verify(userRepository).findById((Long) any());
        verify(roleService).getUserEntity();
    }

    @Test
    void testChangeUserRoleCaseSeven() {
        UserEntity userEntity = mock(UserEntity.class);
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
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

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity1);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);

        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("Role");
        userService.changeUserRole(123L, userRoleDTO);
        verify(userRepository).save((UserEntity) any());
        verify(userRepository).findById((Long) any());
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity, atLeast(1)).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
        verify(roleService).getUserEntity();
    }

    @Test
    void testChangeUserRoleCaseEight() {
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
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity);
        when(userRepository.findById((Long) any())).thenReturn(Optional.empty());
        UserEntity userEntity1 = mock(UserEntity.class);
        doNothing().when(userEntity1).setId((Long) any());
        doNothing().when(userEntity1).setAvatarUrl((String) any());
        doNothing().when(userEntity1).setBlocked((Boolean) any());
        doNothing().when(userEntity1).setEmail((String) any());
        doNothing().when(userEntity1).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity1).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity1).setPassword((String) any());
        doNothing().when(userEntity1).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity1).setUsername((String) any());
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(123L);
        roleEntity.setRole(RoleEnum.USER);
        when(roleService.getUserEntity()).thenReturn(roleEntity);

        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("Role");
        assertThrows(UserNotFoundException.class, () -> userService.changeUserRole(123L, userRoleDTO));
        verify(userRepository).findById((Long) any());
        verify(userEntity1).setId((Long) any());
        verify(userEntity1).setAvatarUrl((String) any());
        verify(userEntity1).setBlocked((Boolean) any());
        verify(userEntity1).setEmail((String) any());
        verify(userEntity1).setFavourites((List<RecipeEntity>) any());
        verify(userEntity1).setIpAddresses((Set<String>) any());
        verify(userEntity1).setPassword((String) any());
        verify(userEntity1).setRoles((List<RoleEntity>) any());
        verify(userEntity1).setUsername((String) any());
    }

    @Test
    void testBlockUser() {
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
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        UserBlockDTO userBlockDTO = new UserBlockDTO();
        userBlockDTO.setId(123L);
        userBlockDTO.setReason("Just cause");
        assertThrows(UserAlreadyBlockedException.class, () -> userService.blockUser(userBlockDTO));
        verify(userRepository).findById((Long) any());
    }

    @Test
    void testBlockUserCaseTwo() {
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getBlocked()).thenReturn(true);
        when(userEntity.getIpAddresses()).thenReturn(new HashSet<>());
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
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

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity1);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        UserBlockDTO userBlockDTO = new UserBlockDTO();
        userBlockDTO.setId(123L);
        userBlockDTO.setReason("Just cause");
        assertThrows(UserAlreadyBlockedException.class, () -> userService.blockUser(userBlockDTO));
        verify(userRepository).findById((Long) any());
        verify(userEntity).getBlocked();
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testBlockUserCaseThree() {
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getBlocked()).thenReturn(false);
        when(userEntity.getIpAddresses()).thenReturn(new HashSet<>());
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
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

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity1);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        UserBlockDTO userBlockDTO = new UserBlockDTO();
        userBlockDTO.setId(123L);
        userBlockDTO.setReason("Just cause");
        userService.blockUser(userBlockDTO);
        verify(userRepository).save((UserEntity) any());
        verify(userRepository).findById((Long) any());
        verify(userEntity).getBlocked();
        verify(userEntity).getIpAddresses();
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity, atLeast(1)).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testBlockUserCaseFour() {
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
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity);
        when(userRepository.findById((Long) any())).thenReturn(Optional.empty());
        UserEntity userEntity1 = mock(UserEntity.class);
        when(userEntity1.getBlocked()).thenReturn(true);
        when(userEntity1.getIpAddresses()).thenReturn(new HashSet<>());
        doNothing().when(userEntity1).setId((Long) any());
        doNothing().when(userEntity1).setAvatarUrl((String) any());
        doNothing().when(userEntity1).setBlocked((Boolean) any());
        doNothing().when(userEntity1).setEmail((String) any());
        doNothing().when(userEntity1).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity1).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity1).setPassword((String) any());
        doNothing().when(userEntity1).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity1).setUsername((String) any());
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");

        UserBlockDTO userBlockDTO = new UserBlockDTO();
        userBlockDTO.setId(123L);
        userBlockDTO.setReason("Just cause");
        assertThrows(UserNotFoundException.class, () -> userService.blockUser(userBlockDTO));
        verify(userRepository).findById((Long) any());
        verify(userEntity1).setId((Long) any());
        verify(userEntity1).setAvatarUrl((String) any());
        verify(userEntity1).setBlocked((Boolean) any());
        verify(userEntity1).setEmail((String) any());
        verify(userEntity1).setFavourites((List<RecipeEntity>) any());
        verify(userEntity1).setIpAddresses((Set<String>) any());
        verify(userEntity1).setPassword((String) any());
        verify(userEntity1).setRoles((List<RoleEntity>) any());
        verify(userEntity1).setUsername((String) any());
    }

    @Test
    void testBlockUserCaseFive() {
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
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        UserBlockDTO userBlockDTO = new UserBlockDTO();
        userBlockDTO.setId(123L);
        userBlockDTO.setReason("Just cause");
        assertThrows(UserAlreadyBlockedException.class, () -> userService.blockUser(userBlockDTO));
        verify(userRepository).findById((Long) any());
    }

    @Test
    void testBlockUserCaseSix() {
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getBlocked()).thenReturn(true);
        when(userEntity.getIpAddresses()).thenReturn(new HashSet<>());
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
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

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity1);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        UserBlockDTO userBlockDTO = new UserBlockDTO();
        userBlockDTO.setId(123L);
        userBlockDTO.setReason("Just cause");
        assertThrows(UserAlreadyBlockedException.class, () -> userService.blockUser(userBlockDTO));
        verify(userRepository).findById((Long) any());
        verify(userEntity).getBlocked();
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testBlockUserCaseSeven() {
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getBlocked()).thenReturn(false);
        when(userEntity.getIpAddresses()).thenReturn(new HashSet<>());
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
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

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity1);
        when(userRepository.findById((Long) any())).thenReturn(ofResult);

        UserBlockDTO userBlockDTO = new UserBlockDTO();
        userBlockDTO.setId(123L);
        userBlockDTO.setReason("Just cause");
        userService.blockUser(userBlockDTO);
        verify(userRepository).save((UserEntity) any());
        verify(userRepository).findById((Long) any());
        verify(userEntity).getBlocked();
        verify(userEntity).getIpAddresses();
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity, atLeast(1)).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testBlockUserCaseEight() {
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
        when(userRepository.save((UserEntity) any())).thenReturn(userEntity);
        when(userRepository.findById((Long) any())).thenReturn(Optional.empty());
        UserEntity userEntity1 = mock(UserEntity.class);
        when(userEntity1.getBlocked()).thenReturn(true);
        when(userEntity1.getIpAddresses()).thenReturn(new HashSet<>());
        doNothing().when(userEntity1).setId((Long) any());
        doNothing().when(userEntity1).setAvatarUrl((String) any());
        doNothing().when(userEntity1).setBlocked((Boolean) any());
        doNothing().when(userEntity1).setEmail((String) any());
        doNothing().when(userEntity1).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity1).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity1).setPassword((String) any());
        doNothing().when(userEntity1).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity1).setUsername((String) any());
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");

        UserBlockDTO userBlockDTO = new UserBlockDTO();
        userBlockDTO.setId(123L);
        userBlockDTO.setReason("Just cause");
        assertThrows(UserNotFoundException.class, () -> userService.blockUser(userBlockDTO));
        verify(userRepository).findById((Long) any());
        verify(userEntity1).setId((Long) any());
        verify(userEntity1).setAvatarUrl((String) any());
        verify(userEntity1).setBlocked((Boolean) any());
        verify(userEntity1).setEmail((String) any());
        verify(userEntity1).setFavourites((List<RecipeEntity>) any());
        verify(userEntity1).setIpAddresses((Set<String>) any());
        verify(userEntity1).setPassword((String) any());
        verify(userEntity1).setRoles((List<RoleEntity>) any());
        verify(userEntity1).setUsername((String) any());
    }

    @Test
    void testDeleteUser() {
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
        doNothing().when(userRepository).delete((UserEntity) any());
        when(userRepository.findById((Long) any())).thenReturn(ofResult);
        doNothing().when(recipeService).detachAllRecipesFromDeletedUser((DeleteUserEvent) any());
        assertEquals(123L, userService.deleteUser(123L).getUserId().longValue());
        verify(userRepository).findById((Long) any());
        verify(userRepository).delete((UserEntity) any());
        verify(recipeService).detachAllRecipesFromDeletedUser((DeleteUserEvent) any());
    }

    @Test
    void testDeleteUserCaseTwo() {
        doNothing().when(userRepository).delete((UserEntity) any());
        when(userRepository.findById((Long) any())).thenReturn(Optional.empty());
        doNothing().when(recipeService).detachAllRecipesFromDeletedUser((DeleteUserEvent) any());
        assertThrows(UserNotFoundException.class, () -> userService.deleteUser(123L));
        verify(userRepository).findById((Long) any());
    }

    @Test
    void testDeleteUserCaseThree() {
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
        doNothing().when(userRepository).delete((UserEntity) any());
        when(userRepository.findById((Long) any())).thenReturn(ofResult);
        doNothing().when(recipeService).detachAllRecipesFromDeletedUser((DeleteUserEvent) any());
        assertEquals(123L, userService.deleteUser(123L).getUserId().longValue());
        verify(userRepository).findById((Long) any());
        verify(userRepository).delete((UserEntity) any());
        verify(recipeService).detachAllRecipesFromDeletedUser((DeleteUserEvent) any());
    }

    @Test
    void testDeleteUserCaseFive() {
        doNothing().when(userRepository).delete((UserEntity) any());
        when(userRepository.findById((Long) any())).thenReturn(Optional.empty());
        doNothing().when(recipeService).detachAllRecipesFromDeletedUser((DeleteUserEvent) any());
        assertThrows(UserNotFoundException.class, () -> userService.deleteUser(123L));
        verify(userRepository).findById((Long) any());
    }
}

