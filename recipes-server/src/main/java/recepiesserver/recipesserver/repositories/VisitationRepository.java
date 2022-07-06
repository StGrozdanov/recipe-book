package recepiesserver.recipesserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.VisitationEntity;

import java.time.LocalDateTime;

@Repository
public interface VisitationRepository extends JpaRepository<VisitationEntity, Long> {
    @Query("SELECT COUNT(v) FROM VisitationEntity v WHERE MONTH(v.visitedAt) = :month")
    long countAllByVisitedAtLike(Integer month);

    long countAllByVisitedAtBetween(LocalDateTime from, LocalDateTime to);
}