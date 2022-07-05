package recepiesserver.recipesserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.RecipeEntity;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {
    List<RecipeEntity> findAllByOwnerId(Long ownerId);

    Integer countByOwnerId(Long ownerId);

    Boolean existsByRecipeNameAndRecipeNameNot(String recipeName, String oldRecipeName);

    Boolean existsByImageUrlAndImageUrlNot(String imageUrl, String oldImageUrl);

    boolean existsByImageUrl(String imageUrl);

    boolean existsByRecipeName(String recipeName);

    List<RecipeEntity> findTop3ByOrderByCreatedAtDesc();

    List<RecipeEntity> findTop3ByOrderByVisitationsCountDesc();
}