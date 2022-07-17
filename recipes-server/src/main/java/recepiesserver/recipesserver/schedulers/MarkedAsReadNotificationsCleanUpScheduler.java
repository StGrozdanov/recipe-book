package recepiesserver.recipesserver.schedulers;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import recepiesserver.recipesserver.services.NotificationService;

@Component
public class MarkedAsReadNotificationsCleanUpScheduler {
    private final NotificationService notificationService;

    public MarkedAsReadNotificationsCleanUpScheduler(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 0 2 * * *")
    public void cleanUpReadNotifications() {
        this.notificationService.clearMarkedAsReadNotifications();
    }
}