package recepiesserver.recipesserver.schedulers;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import recepiesserver.recipesserver.services.PasswordRequestService;

@Component
public class PasswordRequestsCleanUpScheduler {
    private final PasswordRequestService passwordRequestService;

    public PasswordRequestsCleanUpScheduler(PasswordRequestService passwordRequestService) {
        this.passwordRequestService = passwordRequestService;
    }

    @Scheduled(cron = "@daily")
    public void cleanUpReadNotifications() {
        this.passwordRequestService.cleanUpPasswordRequests();
    }
}
