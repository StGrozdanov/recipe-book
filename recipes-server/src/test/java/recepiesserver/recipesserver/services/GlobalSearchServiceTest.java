package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recepiesserver.recipesserver.events.GlobalSearchEvent;

@ContextConfiguration(classes = {GlobalSearchService.class})
@ExtendWith(SpringExtension.class)
class GlobalSearchServiceTest {
    @MockBean
    private ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private GlobalSearchService globalSearchService;

    @Test
    void testAdminSearch() {
        globalSearchService.adminSearch("Query");
        assertTrue(globalSearchService.getAdminSearchResults().isEmpty());
    }

    @Test
    void testAdminSearchResult() {
        globalSearchService.adminSearchResult(new GlobalSearchEvent("Source", "Query"));
        assertTrue(globalSearchService.getAdminSearchResults().isEmpty());
    }

    @Test
    void testAdminSearchResultCaseTwo() {
        GlobalSearchEvent globalSearchEvent = mock(GlobalSearchEvent.class);
        when(globalSearchEvent.getSearchResults()).thenReturn(new ArrayList<>());
        globalSearchService.adminSearchResult(globalSearchEvent);
        verify(globalSearchEvent).getSearchResults();
        assertTrue(globalSearchService.getAdminSearchResults().isEmpty());
    }
}

