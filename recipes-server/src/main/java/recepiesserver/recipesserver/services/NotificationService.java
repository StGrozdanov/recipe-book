package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationDTO;
import recepiesserver.recipesserver.models.entities.NotificationEntity;
import recepiesserver.recipesserver.repositories.NotificationRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public NotificationService(NotificationRepository notificationRepository, UserService userService, ModelMapper modelMapper) {
        this.notificationRepository = notificationRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    public List<NotificationDTO> getUnreadUserNotifications(Long userId) {
        return this.notificationRepository
                                .findAllByReceiversIdAndMarkedAsRead(userId, false)
                                .stream()
                                .map(notification -> this.modelMapper.map(notification, NotificationDTO.class))
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
}
