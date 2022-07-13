package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.visitationDTOs.VisitationCountDTO;
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
    public ResponseEntity<VisitationCountDTO> recordVisitation() {
        return ResponseEntity.ok().body(this.visitationService.recordWebsiteVisitation());
    }

    @GetMapping(Api.VISITATIONS_ENDPOINT)
    public ResponseEntity<VisitationCountDTO> getTotalVisitationsCount() {
        return ResponseEntity.ok().body(this.visitationService.getTotalWebsiteVisitationsCount());
    }

    @PostMapping(Api.VISITATIONS_FOR_GIVEN_MONTH)
    public ResponseEntity<VisitationCountDTO> getTotalWebsiteVisitationsCountForAGivenMonth(
            @RequestBody @Valid VisitationDTO visitationDTO) {
        VisitationCountDTO visitationsCount = this.visitationService
                .getTotalWebsiteVisitationsCountForAGivenMonth(visitationDTO);
        return ResponseEntity.ok().body(visitationsCount);
    }

    @GetMapping(Api.VISITATIONS_FOR_LAST_SIX_MONTHS)
    public ResponseEntity<VisitationCountDTO> getTotalWebsiteVisitationsCountForPreviousSixMonths() {
        VisitationCountDTO visitationsCount = this.visitationService
                .getTotalWebsiteVisitationsCountForTheLastSixMonths();
        return ResponseEntity.ok().body(visitationsCount);
    }

    @GetMapping(Api.VISITATIONS_TODAY)
    public ResponseEntity<VisitationCountDTO> getTotalWebsiteVisitationsToday() {
        return ResponseEntity.ok().body(this.visitationService.getTotalWebsiteVisitationsCountForToday());
    }

    @GetMapping(Api.VISITATIONS_FOR_LAST_SIX_MONTHS_SUMMARY)
    public ResponseEntity<Map<String, Long>> getWebsiteVisitationsSummaryForThePastSixMonths() {
        return ResponseEntity.ok(this.visitationService.getWebsiteVisitationsSummaryForThePastSixMonths());
    }

}