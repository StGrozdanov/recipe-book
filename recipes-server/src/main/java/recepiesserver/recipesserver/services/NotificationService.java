package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationCreateDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationDetailsDTO;
import recepiesserver.recipesserver.models.entities.NotificationEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.NotificationActionEnum;
import recepiesserver.recipesserver.repositories.NotificationRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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
    public void markNotificationAsRead(Long notificationId) {
        Optional<NotificationEntity> notificationById = this.notificationRepository.findById(notificationId);
        if (notificationById.isEmpty()) {
            //TODO: exception
        }
        NotificationEntity notification = notificationById.get();
        notification.setMarkedAsRead(true);

        this.notificationRepository.save(notification);
    }

    public boolean createNotification(NotificationCreateDTO notificationDTO) {
        Optional<RecipeEntity> recipeById = this.recipeService.findRecipeById(notificationDTO.getLocationId());
        Optional<UserEntity> userByUsername = this.userService.findUserByUsername(notificationDTO.getSenderUsername());

        if (recipeById.isPresent() && userByUsername.isPresent()) {
            RecipeEntity recipe = recipeById.get();
            UserEntity sender = userByUsername.get();
            List<Long> notificationReceivers = new ArrayList<>();
            Long ownerId = recipe.getOwnerId();

            addRecipeOwnerInReceiversIfHeIsNotTheNotificationSender(sender, notificationReceivers, ownerId);

            addAllUniqueCommentParticipantsToReceiversIfNotificationIsCommentRelated(
                    notificationDTO,
                    recipe,
                    notificationReceivers
            );

            addAllModeratorsAndAdministratorsInReceivers(notificationReceivers);

            createNotificationForAllUniqueReceiversThatAreNotSenders(
                    notificationDTO,
                    sender,
                    notificationReceivers
            );

            return true;
        }
        //TODO: THROW ERROR
        return false;
    }

    private void createNotificationForAllUniqueReceiversThatAreNotSenders(NotificationCreateDTO notificationDTO, UserEntity sender, List<Long> notificationReceivers) {
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
            List<Long> notificationReceivers
    ) {
        NotificationActionEnum notificationActionEnum = Arrays.stream(NotificationActionEnum.values())
                .filter(action -> action.getName().equals(notificationDTO.getAction()))
                .findFirst()
                .orElse(null);

        //TODO: if null throw exception

        if (notificationActionEnum.ordinal() == 0 || notificationActionEnum.ordinal() == 1) {
            this.commentService
                    .getAllCommentsForTargetRecipe(recipe.getId())
                    .stream()
                    .map(commentDetailsDTO -> commentDetailsDTO.getOwner().getId())
                    .distinct()
                    .forEach(notificationReceivers::add);
        }
    }

    private void addRecipeOwnerInReceiversIfHeIsNotTheNotificationSender(UserEntity sender,
                                                                         List<Long> notificationReceivers,
                                                                         Long ownerId) {
        if (!sender.getId().equals(ownerId)) {
            notificationReceivers.add(ownerId);
        }
    }

    public String getNotificationReceiverUsername(Long userId) {
        return this.userService.findUserById(userId).orElseThrow().getUsername();
    }

    public String getNotificationReceiverUsernameByNotificationId(Long notificationId) {
        Long receiverId = this.notificationRepository.findById(notificationId).orElseThrow().getReceiverId();
        return this.getNotificationReceiverUsername(receiverId);
    }
}
