package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.exceptions.notificationExceptions.NoSuchNotificationActionException;
import recepiesserver.recipesserver.exceptions.notificationExceptions.NotificationNotFoundException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeNotFoundException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationCreateDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationDetailsDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationCreatedAtDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationModifiedAtDTO;
import recepiesserver.recipesserver.models.entities.NotificationEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.NotificationActionEnum;
import recepiesserver.recipesserver.repositories.NotificationRepository;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final RecipeService recipeService;
    private final CommentService commentService;

    public NotificationService(NotificationRepository notificationRepository, UserService userService, ModelMapper modelMapper, RecipeService recipeService, CommentService commentService) {
        this.notificationRepository = notificationRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.recipeService = recipeService;
        this.commentService = commentService;
    }

    public List<NotificationDetailsDTO> getUnreadUserNotifications(Long userId) {
        return this.notificationRepository
                .findAllByReceiverIdAndMarkedAsRead(userId, false)
                .stream()
                .map(notification -> this.modelMapper.map(notification, NotificationDetailsDTO.class))
                .toList();
    }

    @Transactional
    public NotificationModifiedAtDTO markNotificationAsRead(Long notificationId) {
        NotificationEntity notification = this.notificationRepository
                .findById(notificationId)
                .orElseThrow(() -> new NotificationNotFoundException(ExceptionMessages.NOTIFICATION_NOT_FOUND));

        notification.setMarkedAsRead(true);

        return new NotificationModifiedAtDTO().setModifiedAt(LocalDateTime.now());
    }

    public NotificationCreatedAtDTO createNotification(NotificationCreateDTO notificationDTO) {
        RecipeEntity recipe = this.recipeService
                .findRecipeById(notificationDTO.getLocationId())
                .orElseThrow(() -> new RecipeNotFoundException(ExceptionMessages.RECIPE_NOT_FOUND));

        UserEntity sender = this.userService
                .findUserByUsername(notificationDTO.getSenderUsername())
                .orElseThrow(() -> new UserNotFoundException(ExceptionMessages.USER_NOT_FOUND));

        List<Long> notificationReceivers = new ArrayList<>();
        Long ownerId = recipe.getOwnerId();

        this.addRecipeOwnerInReceiversIfHeIsNotTheNotificationSender(sender, notificationReceivers, ownerId);

        this.addAllUniqueCommentParticipantsToReceiversIfNotificationIsCommentRelated(
                notificationDTO,
                recipe,
                notificationReceivers
        );

        this.addAllModeratorsAndAdministratorsInReceivers(notificationReceivers);

        this.createNotificationForAllUniqueReceiversThatAreNotSenders(
                notificationDTO,
                sender,
                notificationReceivers
        );
        return new NotificationCreatedAtDTO().setNotificationCreatedAt(LocalDateTime.now());
    }

    private void createNotificationForAllUniqueReceiversThatAreNotSenders(NotificationCreateDTO notificationDTO,
                                                                          UserEntity sender,
                                                                          List<Long> notificationReceivers) {
        notificationReceivers
                .stream()
                .distinct()
                .filter(receiverId -> !receiverId.equals(sender.getId()))
                .forEach(receiverId -> {
                    NotificationEntity notification = this.modelMapper
                            .map(notificationDTO, NotificationEntity.class);

                    notification.setReceiverId(receiverId);
                    this.notificationRepository.save(notification);
                });
    }

    private void addAllModeratorsAndAdministratorsInReceivers(List<Long> notificationReceivers) {
        notificationReceivers.addAll(this.userService.getAllAdministratorIds());
        notificationReceivers.addAll(this.userService.getAllModeratorIds());
    }

    private void addAllUniqueCommentParticipantsToReceiversIfNotificationIsCommentRelated(
            NotificationCreateDTO notificationDTO,
            RecipeEntity recipe,
            List<Long> notificationReceivers) {
        NotificationActionEnum notificationActionEnum = this.findTheNotificationAction(notificationDTO);

        boolean notificationIsCommentRelated = this.notificationActionIsCommentRelated(notificationActionEnum);

        if (notificationIsCommentRelated) {
            this.commentService
                    .getAllCommentsForTargetRecipe(recipe.getId())
                    .stream()
                    .map(commentDetailsDTO -> commentDetailsDTO.getOwner().getId())
                    .distinct()
                    .forEach(notificationReceivers::add);
        }
    }

    private boolean notificationActionIsCommentRelated(NotificationActionEnum notificationActionEnum) {
        return notificationActionEnum.ordinal() == 0 || notificationActionEnum.ordinal() == 1;
    }

    private NotificationActionEnum findTheNotificationAction(NotificationCreateDTO notificationDTO) {
        return Arrays.stream(NotificationActionEnum.values())
                .filter(action -> action.getName().equals(notificationDTO.getAction()))
                .findFirst()
                .orElseThrow(() -> new NoSuchNotificationActionException(ExceptionMessages.NO_SUCH_ACTION));
    }

    private void addRecipeOwnerInReceiversIfHeIsNotTheNotificationSender(UserEntity sender,
                                                                         List<Long> notificationReceivers,
                                                                         Long ownerId) {
        if (!sender.getId().equals(ownerId)) {
            notificationReceivers.add(ownerId);
        }
    }

    public String getNotificationReceiverUsername(Long userId) {
        return this.userService
                .findUserById(userId)
                .orElseThrow(() -> new UserNotFoundException(ExceptionMessages.USER_NOT_FOUND))
                .getUsername();
    }

    public String getNotificationReceiverUsernameByNotificationId(Long notificationId) {
        Long receiverId = this.notificationRepository
                .findById(notificationId)
                .orElseThrow(() -> new NotificationNotFoundException(ExceptionMessages.NOTIFICATION_NOT_FOUND))
                .getReceiverId();

        return this.getNotificationReceiverUsername(receiverId);
    }
}