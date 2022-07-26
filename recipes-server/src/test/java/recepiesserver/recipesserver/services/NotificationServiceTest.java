package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyBoolean;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recepiesserver.recipesserver.exceptions.notificationExceptions.NoSuchNotificationActionException;
import recepiesserver.recipesserver.exceptions.notificationExceptions.NotificationNotFoundException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeNotFoundException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationCreateDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationDetailsDTO;
import recepiesserver.recipesserver.models.entities.NotificationEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.NotificationActionEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.repositories.NotificationRepository;

@ContextConfiguration(classes = {NotificationService.class})
@ExtendWith(SpringExtension.class)
class NotificationServiceTest {
    @MockBean
    private CommentService commentService;

    @MockBean
    private ModelMapper modelMapper;

    @MockBean
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationService notificationService;

    @MockBean
    private RecipeService recipeService;

    @MockBean
    private UserService userService;

    @Test
    void testGetUnreadUserNotificationsWorksAsExpectedUponEmptyCollection() {
        when(notificationRepository.findAllByReceiverIdAndMarkedAsRead((Long) any(), anyBoolean()))
                .thenReturn(new ArrayList<>());
        assertTrue(notificationService.getUnreadUserNotifications(123L).isEmpty());
        verify(notificationRepository).findAllByReceiverIdAndMarkedAsRead((Long) any(), anyBoolean());
    }

    @Test
    void testGetUnreadUserNotifications() {
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setAction(NotificationActionEnum.CREATED_COMMENT);
        notificationEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationEntity.setId(123L);
        notificationEntity.setLocationId(123L);
        notificationEntity.setLocationName("Location Name");
        notificationEntity.setMarkedAsRead(true);
        notificationEntity.setReceiverId(123L);
        notificationEntity.setSenderAvatar("Sender Avatar");
        notificationEntity.setSenderUsername("janedoe");

        ArrayList<NotificationEntity> notificationEntityList = new ArrayList<>();
        notificationEntityList.add(notificationEntity);
        when(notificationRepository.findAllByReceiverIdAndMarkedAsRead((Long) any(), anyBoolean()))
                .thenReturn(notificationEntityList);

        NotificationDetailsDTO notificationDetailsDTO = new NotificationDetailsDTO();
        notificationDetailsDTO.setAction("Action");
        notificationDetailsDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationDetailsDTO.setId(123L);
        notificationDetailsDTO.setLocationId(123L);
        notificationDetailsDTO.setLocationName("Location Name");
        notificationDetailsDTO.setSenderAvatar("Sender Avatar");
        notificationDetailsDTO.setSenderUsername("janedoe");
        when(modelMapper.map((Object) any(), (Class<NotificationDetailsDTO>) any())).thenReturn(notificationDetailsDTO);
        assertEquals(1, notificationService.getUnreadUserNotifications(123L).size());
        verify(notificationRepository).findAllByReceiverIdAndMarkedAsRead((Long) any(), anyBoolean());
        verify(modelMapper).map((Object) any(), (Class<NotificationDetailsDTO>) any());
    }

    @Test
    void testGetUnreadUserNotificationsShouldThrow() {
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setAction(NotificationActionEnum.CREATED_COMMENT);
        notificationEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationEntity.setId(123L);
        notificationEntity.setLocationId(123L);
        notificationEntity.setLocationName("Location Name");
        notificationEntity.setMarkedAsRead(true);
        notificationEntity.setReceiverId(123L);
        notificationEntity.setSenderAvatar("Sender Avatar");
        notificationEntity.setSenderUsername("janedoe");

        ArrayList<NotificationEntity> notificationEntityList = new ArrayList<>();
        notificationEntityList.add(notificationEntity);
        when(notificationRepository.findAllByReceiverIdAndMarkedAsRead((Long) any(), anyBoolean()))
                .thenReturn(notificationEntityList);
        when(modelMapper.map((Object) any(), (Class<NotificationDetailsDTO>) any()))
                .thenThrow(new NoSuchNotificationActionException("An error occurred"));
        assertThrows(NoSuchNotificationActionException.class, () -> notificationService.getUnreadUserNotifications(123L));
        verify(notificationRepository).findAllByReceiverIdAndMarkedAsRead((Long) any(), anyBoolean());
        verify(modelMapper).map((Object) any(), (Class<NotificationDetailsDTO>) any());
    }

    @Test
    void testMarkNotificationAsRead() {
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setAction(NotificationActionEnum.CREATED_COMMENT);
        notificationEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationEntity.setId(123L);
        notificationEntity.setLocationId(123L);
        notificationEntity.setLocationName("Location Name");
        notificationEntity.setMarkedAsRead(true);
        notificationEntity.setReceiverId(123L);
        notificationEntity.setSenderAvatar("Sender Avatar");
        notificationEntity.setSenderUsername("janedoe");
        Optional<NotificationEntity> ofResult = Optional.of(notificationEntity);
        when(notificationRepository.findById((Long) any())).thenReturn(ofResult);
        notificationService.markNotificationAsRead(123L);
        verify(notificationRepository).findById((Long) any());
    }

    @Test
    void testMarkNotificationAsReadShouldThrowUponNonExistentNotification() {
        when(notificationRepository.findById((Long) any())).thenReturn(Optional.empty());
        assertThrows(NotificationNotFoundException.class, () -> notificationService.markNotificationAsRead(123L));
        verify(notificationRepository).findById((Long) any());
    }

    @Test
    void testMarkNotificationAsReadShouldThrowUponInvalidNotificationAction() {
        when(notificationRepository.findById((Long) any()))
                .thenThrow(new NoSuchNotificationActionException("An error occurred"));
        assertThrows(NoSuchNotificationActionException.class, () -> notificationService.markNotificationAsRead(123L));
        verify(notificationRepository).findById((Long) any());
    }

    @Test
    void testCreateNotification() {
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
        when(userService.findUserByUsername((String) any())).thenReturn(ofResult);

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);
        Optional<RecipeEntity> ofResult1 = Optional.of(recipeEntity);
        when(recipeService.findRecipeById((Long) any())).thenReturn(ofResult1);

        NotificationCreateDTO notificationCreateDTO = new NotificationCreateDTO();
        notificationCreateDTO.setAction("Action");
        notificationCreateDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationCreateDTO.setLocationId(123L);
        notificationCreateDTO.setLocationName("Location Name");
        notificationCreateDTO.setMarkedAsRead(true);
        notificationCreateDTO.setSenderAvatar("Sender Avatar");
        notificationCreateDTO.setSenderUsername("janedoe");
        assertThrows(NoSuchNotificationActionException.class,
                () -> notificationService.createNotification(notificationCreateDTO));
        verify(userService).findUserByUsername((String) any());
        verify(recipeService).findRecipeById((Long) any());
    }

    @Test
    void testCreateNotificationCaseTwo() {
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getId()).thenReturn(1L);
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
        when(userService.findUserByUsername((String) any())).thenReturn(ofResult);

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);
        Optional<RecipeEntity> ofResult1 = Optional.of(recipeEntity);
        when(recipeService.findRecipeById((Long) any())).thenReturn(ofResult1);

        NotificationCreateDTO notificationCreateDTO = new NotificationCreateDTO();
        notificationCreateDTO.setAction("Action");
        notificationCreateDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationCreateDTO.setLocationId(123L);
        notificationCreateDTO.setLocationName("Location Name");
        notificationCreateDTO.setMarkedAsRead(true);
        notificationCreateDTO.setSenderAvatar("Sender Avatar");
        notificationCreateDTO.setSenderUsername("janedoe");
        assertThrows(NoSuchNotificationActionException.class,
                () -> notificationService.createNotification(notificationCreateDTO));
        verify(userService).findUserByUsername((String) any());
        verify(userEntity).getId();
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
        verify(recipeService).findRecipeById((Long) any());
    }

    @Test
    void testGetNotificationReceiverUsername() {
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
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        assertEquals("janedoe", notificationService.getNotificationReceiverUsername(123L));
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testGetNotificationReceiverUsernameCaseTwo() {
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getUsername()).thenReturn("janedoe");
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
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        assertEquals("janedoe", notificationService.getNotificationReceiverUsername(123L));
        verify(userService).findUserById((Long) any());
        verify(userEntity).getUsername();
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
    void testGetNotificationReceiverUsernameByNotificationId() {
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setAction(NotificationActionEnum.CREATED_COMMENT);
        notificationEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationEntity.setId(123L);
        notificationEntity.setLocationId(123L);
        notificationEntity.setLocationName("Location Name");
        notificationEntity.setMarkedAsRead(true);
        notificationEntity.setReceiverId(123L);
        notificationEntity.setSenderAvatar("Sender Avatar");
        notificationEntity.setSenderUsername("janedoe");
        Optional<NotificationEntity> ofResult = Optional.of(notificationEntity);
        when(notificationRepository.findById((Long) any())).thenReturn(ofResult);

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
        Optional<UserEntity> ofResult1 = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult1);
        assertEquals("janedoe", notificationService.getNotificationReceiverUsernameByNotificationId(123L));
        verify(notificationRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testGetNotificationReceiverUsernameByNotificationIdShouldThrowUponInvalidNotificationAction() {
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setAction(NotificationActionEnum.CREATED_COMMENT);
        notificationEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationEntity.setId(123L);
        notificationEntity.setLocationId(123L);
        notificationEntity.setLocationName("Location Name");
        notificationEntity.setMarkedAsRead(true);
        notificationEntity.setReceiverId(123L);
        notificationEntity.setSenderAvatar("Sender Avatar");
        notificationEntity.setSenderUsername("janedoe");
        Optional<NotificationEntity> ofResult = Optional.of(notificationEntity);
        when(notificationRepository.findById((Long) any())).thenReturn(ofResult);
        when(userService.findUserById((Long) any())).thenThrow(new NoSuchNotificationActionException("An error occurred"));
        assertThrows(NoSuchNotificationActionException.class,
                () -> notificationService.getNotificationReceiverUsernameByNotificationId(123L));
        verify(notificationRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testGetNotificationReceiverUsernameByNotificationIdShouldThrowUponNonExistentNotification() {
        when(notificationRepository.findById((Long) any())).thenReturn(Optional.empty());

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
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        assertThrows(NotificationNotFoundException.class,
                () -> notificationService.getNotificationReceiverUsernameByNotificationId(123L));
        verify(notificationRepository).findById((Long) any());
    }

    @Test
    void testGetNotificationReceiverUsernameByNotificationIdCaseTwo() {
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setAction(NotificationActionEnum.CREATED_COMMENT);
        notificationEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        notificationEntity.setId(123L);
        notificationEntity.setLocationId(123L);
        notificationEntity.setLocationName("Location Name");
        notificationEntity.setMarkedAsRead(true);
        notificationEntity.setReceiverId(123L);
        notificationEntity.setSenderAvatar("Sender Avatar");
        notificationEntity.setSenderUsername("janedoe");
        Optional<NotificationEntity> ofResult = Optional.of(notificationEntity);
        when(notificationRepository.findById((Long) any())).thenReturn(ofResult);
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getUsername()).thenReturn("janedoe");
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
        Optional<UserEntity> ofResult1 = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult1);
        assertEquals("janedoe", notificationService.getNotificationReceiverUsernameByNotificationId(123L));
        verify(notificationRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
        verify(userEntity).getUsername();
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
    void testClearMarkedAsReadNotifications() {
        when(notificationRepository.findAllByMarkedAsReadTrue())
                .thenThrow(new RecipeNotFoundException("An error occurred"));
        doThrow(new RecipeNotFoundException("An error occurred")).when(notificationRepository)
                .deleteAll((Iterable<NotificationEntity>) any());
        assertThrows(RecipeNotFoundException.class, () -> notificationService.clearMarkedAsReadNotifications());
        verify(notificationRepository).findAllByMarkedAsReadTrue();
    }

    @Test
    void testGetUnreadUserNotificationsCount() {
        when(notificationRepository.countAllByReceiverIdAndMarkedAsReadFalse((Long) any())).thenReturn(3L);
        assertEquals(3L, notificationService.getUnreadUserNotificationsCount(123L).getNotificationsCount());
        verify(notificationRepository).countAllByReceiverIdAndMarkedAsReadFalse((Long) any());
    }

    @Test
    void testGetUnreadUserNotificationsCountShouldThrow() {
        when(notificationRepository.countAllByReceiverIdAndMarkedAsReadFalse((Long) any()))
                .thenThrow(new NoSuchNotificationActionException("An error occurred"));
        assertThrows(NoSuchNotificationActionException.class,
                () -> notificationService.getUnreadUserNotificationsCount(123L));
        verify(notificationRepository).countAllByReceiverIdAndMarkedAsReadFalse((Long) any());
    }
}

