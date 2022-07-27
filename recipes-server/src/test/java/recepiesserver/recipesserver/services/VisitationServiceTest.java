package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.Map;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recepiesserver.recipesserver.models.dtos.visitationDTOs.VisitationDTO;
import recepiesserver.recipesserver.models.entities.VisitationEntity;
import recepiesserver.recipesserver.repositories.VisitationRepository;

@ContextConfiguration(classes = {VisitationService.class})
@ExtendWith(SpringExtension.class)
class VisitationServiceTest {
    @MockBean
    private VisitationRepository visitationRepository;

    @Autowired
    private VisitationService visitationService;

    @Test
    void testRecordWebsiteVisitation() {
        VisitationEntity visitationEntity = new VisitationEntity();
        visitationEntity.setId(123L);
        visitationEntity.setVisitedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        when(visitationRepository.save((VisitationEntity) any())).thenReturn(visitationEntity);
        when(visitationRepository.count()).thenReturn(3L);
        assertEquals(3L, visitationService.recordWebsiteVisitation().getVisitationsCount().longValue());
        verify(visitationRepository).save((VisitationEntity) any());
        verify(visitationRepository).count();
    }

    @Test
    void testGetTotalWebsiteVisitationsCount() {
        when(visitationRepository.count()).thenReturn(3L);
        assertEquals(3L, visitationService.getTotalWebsiteVisitationsCount().getVisitationsCount().longValue());
        verify(visitationRepository).count();
    }

    @Test
    void testGetTotalWebsiteVisitationsCountForAGivenMonth() {
        when(visitationRepository.countAllByVisitedAtLike((Integer) any())).thenReturn(3L);

        VisitationDTO visitationDTO = new VisitationDTO();
        visitationDTO.setMonth(Month.JANUARY);
        assertEquals(3L,
                visitationService.getTotalWebsiteVisitationsCountForAGivenMonth(visitationDTO)
                        .getVisitationsCount()
                        .longValue());
        verify(visitationRepository).countAllByVisitedAtLike((Integer) any());
    }

    @Test
    void testGetTotalWebsiteVisitationsCountForTheLastSixMonths() {
        when(visitationRepository.countAllByVisitedAtBetween((LocalDateTime) any(), (LocalDateTime) any())).thenReturn(3L);
        assertEquals(3L,
                visitationService.getTotalWebsiteVisitationsCountForTheLastSixMonths().getVisitationsCount().longValue());
        verify(visitationRepository).countAllByVisitedAtBetween((LocalDateTime) any(), (LocalDateTime) any());
    }

    @Test
    void testGetTotalWebsiteVisitationsCountForToday() {
        when(visitationRepository.countAllByVisitedAtBetween((LocalDateTime) any(), (LocalDateTime) any())).thenReturn(3L);
        assertEquals(3L, visitationService.getTotalWebsiteVisitationsCountForToday().getVisitationsCount().longValue());
        verify(visitationRepository).countAllByVisitedAtBetween((LocalDateTime) any(), (LocalDateTime) any());
    }

    @Test
    void testRestartVisitationStatistics() {
        when(visitationRepository.count()).thenReturn(3L);
        doNothing().when(visitationRepository).deleteAll();
        assertEquals(3L, visitationService.restartVisitationStatistics());
        verify(visitationRepository).count();
        verify(visitationRepository).deleteAll();
    }
}

