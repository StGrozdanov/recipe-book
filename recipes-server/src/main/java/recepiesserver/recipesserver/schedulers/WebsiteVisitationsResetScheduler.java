package recepiesserver.recipesserver.schedulers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import recepiesserver.recipesserver.services.VisitationService;


@Component
public class WebsiteVisitationsResetScheduler {
    private static final Logger LOGGER = LoggerFactory.getLogger(WebsiteVisitationsResetScheduler.class);
    private final VisitationService visitationService;

    public WebsiteVisitationsResetScheduler(VisitationService visitationService) {
        this.visitationService = visitationService;
    }

    @Scheduled(cron = "@yearly")
    public void cleanUpReadNotifications() {
        long totalVisitationsForTheYear = this.visitationService.restartVisitationStatistics();
        LOGGER.info("Successfully cleared up website visitations from the previous year. The total yearly visitations were {} !", totalVisitationsForTheYear);
    }
}
