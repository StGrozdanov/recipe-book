package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationDTO;
import recepiesserver.recipesserver.services.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(@PathVariable Long userId) {
        List<NotificationDTO> userNotifications = this.notificationService.getUnreadUserNotifications(userId);

        return ResponseEntity.ok().body(userNotifications);
    }

    @PatchMapping("/{notificationId}")
    public ResponseEntity<NotificationDTO> markNotificationAsRead(@PathVariable Long notificationId) {
        this.notificationService.markNotificationAsRead(notificationId);

        return ResponseEntity.ok().build();
    }
}