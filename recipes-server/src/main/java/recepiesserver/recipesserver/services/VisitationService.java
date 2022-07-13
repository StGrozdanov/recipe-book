package recepiesserver.recipesserver.services;

import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.visitationDTOs.VisitationCountDTO;
import recepiesserver.recipesserver.models.dtos.visitationDTOs.VisitationDTO;
import recepiesserver.recipesserver.models.entities.VisitationEntity;
import recepiesserver.recipesserver.repositories.VisitationRepository;
import recepiesserver.recipesserver.utils.BulgarianMonthTransformerUtil;

import javax.transaction.Transactional;
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

    @Transactional
    public VisitationCountDTO recordWebsiteVisitation() {
        VisitationEntity visitationEntity = new VisitationEntity();
        visitationEntity.setVisitedAt(LocalDateTime.now());

        this.visitationRepository.save(visitationEntity);

        return this.getTotalWebsiteVisitationsCount();
    }

    public VisitationCountDTO getTotalWebsiteVisitationsCount() {
        return new VisitationCountDTO(this.visitationRepository.count());
    }

    public VisitationCountDTO getTotalWebsiteVisitationsCountForAGivenMonth(VisitationDTO visitationDTO) {
        Integer month = visitationDTO.getMonth().getValue();

        long visitationsCount = this.visitationRepository.countAllByVisitedAtLike(month);

        return new VisitationCountDTO(visitationsCount);
    }

    public VisitationCountDTO getTotalWebsiteVisitationsCountForTheLastSixMonths() {
        Calendar currentTime = Calendar.getInstance();

        Calendar sixMonthsAgo = Calendar.getInstance();
        sixMonthsAgo.add(Calendar.MONTH, -6);
        sixMonthsAgo.set(Calendar.DAY_OF_MONTH, 1);

        LocalDateTime to = LocalDateTime
                .ofInstant(currentTime.toInstant(), currentTime.getTimeZone().toZoneId()).minusMonths(0);

        LocalDateTime from = LocalDateTime
                .ofInstant(sixMonthsAgo.toInstant(), sixMonthsAgo.getTimeZone().toZoneId()).minusMonths(0);

        long visitationsCount = this.visitationRepository.countAllByVisitedAtBetween(from, to);

        return new VisitationCountDTO(visitationsCount);
    }

    public VisitationCountDTO getTotalWebsiteVisitationsCountForToday() {
        LocalDateTime from = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime to = LocalDateTime.now();

        long visitationsCount = this.visitationRepository.countAllByVisitedAtBetween(from, to);

        return new VisitationCountDTO(visitationsCount);
    }

    public Map<String, Long> getWebsiteVisitationsSummaryForThePastSixMonths() {
        List<Month> pastSixMonths = extractThePastSixMonths();

        Map<String, Long> monthStatistics = new LinkedHashMap<>();

        pastSixMonths.forEach(month -> {
            String monthInBulgarian = BulgarianMonthTransformerUtil.translateMonthToBulgarian(month);
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
