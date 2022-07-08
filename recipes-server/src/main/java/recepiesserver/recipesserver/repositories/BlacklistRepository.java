package recepiesserver.recipesserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.BlacklistEntity;

import java.util.Optional;

@Repository
public interface BlacklistRepository extends JpaRepository<BlacklistEntity, Long> {
    Optional<BlacklistEntity> findByIpAddress(String ipAddress);

    boolean existsByIpAddress(String ipAddress);
}
