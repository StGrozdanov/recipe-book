package recepiesserver.recipesserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.UserEntity;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Boolean existsByUsernameAndUsernameNot(String username, String usernameNot);

    Boolean existsByEmailAndEmailNot(String email, String emailNot);

    Boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
