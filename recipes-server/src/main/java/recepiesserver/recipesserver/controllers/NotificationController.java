package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationCreateDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationDetailsDTO;
import recepiesserver.recipesserver.services.NotificationService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationDetailsDTO>> getUserNotifications(@PathVariable Long userId) {
        List<NotificationDetailsDTO> userNotifications = this.notificationService.getUnreadUserNotifications(userId);

        return ResponseEntity.ok().body(userNotifications);
    }

    @PatchMapping("/{notificationId}")
    public ResponseEntity<NotificationDetailsDTO> markNotificationAsRead(@PathVariable Long notificationId) {
        this.notificationService.markNotificationAsRead(notificationId);

        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Long> createNotification(@RequestBody @Valid NotificationCreateDTO notificationDTO) {
        boolean notificationIsCreated = this.notificationService.createNotification(notificationDTO);

        return notificationIsCreated
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }
}