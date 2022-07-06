package recepiesserver.recipesserver.services;

import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.visitationDTOs.VisitationDTO;
import recepiesserver.recipesserver.models.entities.VisitationEntity;
import recepiesserver.recipesserver.repositories.VisitationRepository;
import recepiesserver.recipesserver.utils.BulgarianMonthTransformer;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;

@Service
public class VisitationService {
    private final VisitationRepository visitationRepository;

    public VisitationService(VisitationRepository visitationRepository) {
        this.visitationRepository = visitationRepository;
    }

    public void recordWebsiteVisitation() {
        VisitationEntity visitationEntity = new VisitationEntity();
        visitationEntity.setVisitedAt(LocalDateTime.now());

        this.visitationRepository.save(visitationEntity);
    }

    public long getTotalWebsiteVisitationsCount() {
        return this.visitationRepository.count();
    }


    public long getTotalWebsiteVisitationsCountForAGivenMonth(VisitationDTO visitationDTO) {
        Integer month = (Integer) visitationDTO.getMonth().getValue();

        return this.visitationRepository.countAllByVisitedAtLike(month);
    }

    public long getTotalWebsiteVisitationsCountForTheLastSixMonths() {
        Calendar currentTime = Calendar.getInstance();

        Calendar sixMonthsAgo = Calendar.getInstance();
        sixMonthsAgo.add(Calendar.MONTH, -6);
        sixMonthsAgo.set(Calendar.DAY_OF_MONTH, 1);

        LocalDateTime to = LocalDateTime
                .ofInstant(currentTime.toInstant(), currentTime.getTimeZone().toZoneId()).minusMonths(0);

        LocalDateTime from = LocalDateTime
                .ofInstant(sixMonthsAgo.toInstant(), sixMonthsAgo.getTimeZone().toZoneId()).minusMonths(0);

        return this.visitationRepository.countAllByVisitedAtBetween(from, to);
    }

    public long getTotalWebsiteVisitationsCountForToday() {
        LocalDateTime from = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime to = LocalDateTime.now();

        return this.visitationRepository.countAllByVisitedAtBetween(from, to);
    }

    public Map<String, Long> getWebsiteVisitationsSummaryForThePastSixMonths() {
        List<Month> pastSixMonths = extractThePastSixMonths();

        Map<String, Long> monthStatistics = new LinkedHashMap<>();

        pastSixMonths.forEach(month -> {
            String monthInBulgarian = BulgarianMonthTransformer.translateMonthToBulgarian(month);
            long monthStatistic = this.visitationRepository.countAllByVisitedAtLike(month.getValue());

            monthStatistics.put(monthInBulgarian, monthStatistic);
        });

        return monthStatistics;
    }

    private List<Month> extractThePastSixMonths() {
        List<Month> pastSixMonths = new ArrayList<>();

        for (int i = 1; i <= 6; i++) {
            Month month = LocalDate.now().minusMonths(i).getMonth();
            pastSixMonths.add(month);
        }
        return pastSixMonths;
    }
}
