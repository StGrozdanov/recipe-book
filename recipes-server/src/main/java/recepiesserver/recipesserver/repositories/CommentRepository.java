package recepiesserver.recipesserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.CommentEntity;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    List<CommentEntity> findAllByTargetRecipe_Id(Long targetRecipeId);

    List<CommentEntity> findTop6ByOrderByCreatedAtDesc();

    long countAllByOwner_Id(Long ownerId);

    List<CommentEntity> findAllByContentContaining(String content);
}
