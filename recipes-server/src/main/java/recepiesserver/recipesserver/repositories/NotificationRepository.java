package recepiesserver.recipesserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.NotificationEntity;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findAllByReceiverIdAndMarkedAsRead(Long userId, boolean markedAsRead);

    List<NotificationEntity> findAllByMarkedAsReadTrue();

    long countAllByReceiverIdAndMarkedAsReadFalse(Long receiverId);
}
