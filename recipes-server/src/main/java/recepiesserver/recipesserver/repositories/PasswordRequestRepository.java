package recepiesserver.recipesserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.PasswordRequestEntity;

import java.util.Optional;

@Repository
public interface PasswordRequestRepository extends JpaRepository<PasswordRequestEntity, Long> {
    Optional<PasswordRequestEntity> findByCode(String code);
}
