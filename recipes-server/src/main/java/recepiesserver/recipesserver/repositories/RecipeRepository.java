package recepiesserver.recipesserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.RecipeEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {
    Optional<RecipeEntity> findByRecipeName(String recipeName);

    Optional<RecipeEntity> findByImageUrl(String image);

    List<RecipeEntity> findAllByOwnerId(Long ownerId);

    Integer countByOwnerId(Long ownerId);

    Boolean existsByRecipeNameAndRecipeNameNot(String recipeName, String oldRecipeName);

    Boolean existsByImageUrlAndImageUrlNot(String imageUrl, String oldImageUrl);
}
