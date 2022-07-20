package recepiesserver.recipesserver.events;

import org.springframework.context.ApplicationEvent;
import recepiesserver.recipesserver.models.dtos.globalSearchDTOs.AdminGlobalSearchDTO;

import java.util.ArrayList;
import java.util.List;

public class GlobalSearchEvent extends ApplicationEvent {
    private final String query;
    private List<AdminGlobalSearchDTO> searchResults;

    public GlobalSearchEvent(Object source, String query) {
        super(source);
        this.query = query;
        this.searchResults = new ArrayList<>();
    }

    public String getQuery() {
        return query;
    }

    public List<AdminGlobalSearchDTO> getSearchResults() {
        return searchResults;
    }
}
