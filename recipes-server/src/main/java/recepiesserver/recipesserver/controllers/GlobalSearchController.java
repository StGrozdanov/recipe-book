package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import recepiesserver.recipesserver.models.dtos.globalSearchDTOs.AdminGlobalSearchDTO;
import recepiesserver.recipesserver.services.GlobalSearchService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.validation.constraints.NotBlank;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GlobalSearchController {
    private final GlobalSearchService globalSearchService;

    public GlobalSearchController(GlobalSearchService globalSearchService) {
        this.globalSearchService = globalSearchService;
    }

    @GetMapping(Api.GLOBAL_SEARCH_ADMIN)
    public ResponseEntity<List<AdminGlobalSearchDTO>> getAllComments(@RequestParam("where") @NotBlank String query) {
        this.globalSearchService.adminSearch(query);
        List<AdminGlobalSearchDTO> adminSearchResults = this.globalSearchService.getAdminSearchResults();
        return ResponseEntity.ok().body(adminSearchResults);
    }
}
