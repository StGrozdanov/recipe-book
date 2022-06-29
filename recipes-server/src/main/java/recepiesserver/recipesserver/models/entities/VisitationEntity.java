package recepiesserver.recipesserver.models.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitations")
public class VisitationEntity extends BaseEntity {
    private LocalDateTime visitedAt;

    @Column(name = "visited_at", nullable = false)
    public LocalDateTime getVisitedAt() {
        return visitedAt;
    }

    public void setVisitedAt(LocalDateTime visitedAt) {
        this.visitedAt = visitedAt;
    }
}
