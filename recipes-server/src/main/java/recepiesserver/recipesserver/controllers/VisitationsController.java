package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.visitationDTOs.VisitationDTO;
import recepiesserver.recipesserver.services.VisitationService;

import javax.validation.Valid;

@RestController
@RequestMapping("/visitations")
public class VisitationsController {
    private final VisitationService visitationService;

    public VisitationsController(VisitationService visitationService) {
        this.visitationService = visitationService;
    }

    @PostMapping
    public ResponseEntity<Long> recordVisitation() {
        this.visitationService.recordWebsiteVisitation();
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Long> getTotalVisitationsCount() {
        long totalVisitations = this.visitationService.getTotalWebsiteVisitationsCount();
        return ResponseEntity.ok(totalVisitations);
    }

    @PostMapping("/by-target-month")
    public ResponseEntity<Long> getTotalWebsiteVisitationsCountForAGivenMonth(
            @RequestBody @Valid VisitationDTO visitationDTO) {
        long totalVisitations = this.visitationService
                .getTotalWebsiteVisitationsCountForAGivenMonth(visitationDTO);

        return ResponseEntity.ok(totalVisitations);
    }

    @GetMapping("/the-last-six-months")
    public ResponseEntity<Long> getTotalWebsiteVisitationsCountForAGivenMonth() {
        long totalVisitations = this.visitationService.getTotalWebsiteVisitationsCountForTheLastSixMonths();
        return ResponseEntity.ok(totalVisitations);
    }

    @GetMapping("/today")
    public ResponseEntity<Long> getTotalWebsiteVisitationsToday() {
        long totalVisitations = this.visitationService.getTotalWebsiteVisitationsCountForToday();
        return ResponseEntity.ok(totalVisitations);
    }

}