package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.visitationDTOs.VisitationDTO;
import recepiesserver.recipesserver.services.VisitationService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.validation.Valid;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class VisitationsController {
    private final VisitationService visitationService;

    public VisitationsController(VisitationService visitationService) {
        this.visitationService = visitationService;
    }

    @PostMapping(Api.VISITATIONS_ENDPOINT)
    public ResponseEntity<Long> recordVisitation() {
        this.visitationService.recordWebsiteVisitation();
        return ResponseEntity.ok().build();
    }

    @GetMapping(Api.VISITATIONS_ENDPOINT)
    public ResponseEntity<Long> getTotalVisitationsCount() {
        long totalVisitations = this.visitationService.getTotalWebsiteVisitationsCount();
        return ResponseEntity.ok(totalVisitations);
    }

    @PostMapping(Api.VISITATIONS_FOR_GIVEN_MONTH)
    public ResponseEntity<Long> getTotalWebsiteVisitationsCountForAGivenMonth(
            @RequestBody @Valid VisitationDTO visitationDTO) {
        long totalVisitations = this.visitationService
                .getTotalWebsiteVisitationsCountForAGivenMonth(visitationDTO);

        return ResponseEntity.ok(totalVisitations);
    }

    @GetMapping(Api.VISITATIONS_FOR_LAST_SIX_MONTHS)
    public ResponseEntity<Long> getTotalWebsiteVisitationsCountForPreviousSixMonths() {
        long totalVisitations = this.visitationService.getTotalWebsiteVisitationsCountForTheLastSixMonths();
        return ResponseEntity.ok(totalVisitations);
    }

    @GetMapping(Api.VISITATIONS_TODAY)
    public ResponseEntity<Long> getTotalWebsiteVisitationsToday() {
        long totalVisitations = this.visitationService.getTotalWebsiteVisitationsCountForToday();
        return ResponseEntity.ok(totalVisitations);
    }

    @GetMapping(Api.VISITATIONS_FOR_LAST_SIX_MONTHS_SUMMARY)
    public ResponseEntity<Map<String, Long>> getWebsiteVisitationsSummaryForThePastSixMonths() {
        return ResponseEntity.ok(this.visitationService.getWebsiteVisitationsSummaryForThePastSixMonths());
    }

}