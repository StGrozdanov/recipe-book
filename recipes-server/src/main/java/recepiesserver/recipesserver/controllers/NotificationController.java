package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationCreateDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationDetailsDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationCreatedDataDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationModifiedAtDTO;
import recepiesserver.recipesserver.services.NotificationService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping(Api.USER_NOTIFICATIONS)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @notificationService.getNotificationReceiverUsername(#userId)) " +
            "|| hasRole('ADMINISTRATOR')")
    public ResponseEntity<List<NotificationDetailsDTO>> getUserNotifications(@PathVariable Long userId,
                                                                             HttpServletRequest request) {
        List<NotificationDetailsDTO> userNotifications = this.notificationService.getUnreadUserNotifications(userId);
        return ResponseEntity.ok().body(userNotifications);
    }

    @PatchMapping(Api.MARK_NOTIFICATION_AS_READ)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), " +
            "@notificationService.getNotificationReceiverUsernameByNotificationId(#notificationId))")
    public ResponseEntity<NotificationModifiedAtDTO> markNotificationAsRead(@PathVariable Long notificationId,
                                                                            HttpServletRequest request) {
        return ResponseEntity.ok().body(this.notificationService.markNotificationAsRead(notificationId));
    }

    @PostMapping(Api.NOTIFICATION_ENDPOINT)
    public ResponseEntity<NotificationCreatedDataDTO> createNotification(
            @RequestBody @Valid NotificationCreateDTO notificationDTO) {
        return ResponseEntity.ok().body(this.notificationService.createNotification(notificationDTO));
    }
}