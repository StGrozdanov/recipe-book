package recepiesserver.recipesserver.services;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.events.GlobalSearchEvent;
import recepiesserver.recipesserver.models.dtos.globalSearchDTOs.AdminGlobalSearchDTO;

import java.util.ArrayList;
import java.util.List;

@Service
public class GlobalSearchService {
    private final List<AdminGlobalSearchDTO> adminSearchResults;
    private final ApplicationEventPublisher eventPublisher;

    public GlobalSearchService(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
        this.adminSearchResults = new ArrayList<>();
    }

    public void adminSearch(String query) {
        this.eventPublisher.publishEvent(new GlobalSearchEvent(GlobalSearchService.class, query));
    }

    @Order(4)
    @EventListener(GlobalSearchEvent.class)
    public void adminSearchResult(GlobalSearchEvent event) {
        adminSearchResults.clear();
        List<AdminGlobalSearchDTO> searchResults = event.getSearchResults();
        this.adminSearchResults.addAll(searchResults);
    }

    @Order(5)
    @EventListener(GlobalSearchEvent.class)
    public List<AdminGlobalSearchDTO> getAdminSearchResults() {
        return adminSearchResults;
    }
}