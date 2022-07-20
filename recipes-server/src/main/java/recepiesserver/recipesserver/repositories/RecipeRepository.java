package recepiesserver.recipesserver.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;

import java.util.Collection;
import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {
    List<RecipeEntity> findAllByOwnerId(Long ownerId);

    Integer countByOwnerId(Long ownerId);

    Boolean existsByRecipeNameAndRecipeNameNot(String recipeName, String oldRecipeName);

    Boolean existsByImageUrlAndImageUrlNot(String imageUrl, String oldImageUrl);

    boolean existsByImageUrl(String imageUrl);

    boolean existsByRecipeName(String recipeName);

    List<RecipeEntity> findTop3ByStatusNotOrderByCreatedAtDesc(PublicationStatusEnum status);

    List<RecipeEntity> findTop3ByStatusNotOrderByVisitationsCountDesc(PublicationStatusEnum status);

    List<RecipeEntity> findAllByRecipeNameContainingAndStatusNot(String recipeName, PublicationStatusEnum status);

    List<RecipeEntity> findAllByOwnerIdAndRecipeNameContaining(Long ownerId, String recipeName);

    List<RecipeEntity> findAllByCategoryInAndStatusNot(Collection<CategoryEnum> categories, PublicationStatusEnum status);

    @Query("SELECT r.ownerId FROM RecipeEntity r GROUP BY r.ownerId HAVING COUNT(r) >= ALL(SELECT COUNT(r) " +
            "FROM RecipeEntity r GROUP BY r.ownerId)")
    Long findMostActiveUser();

    Page<RecipeEntity> findAllByStatus(PublicationStatusEnum status, Pageable pageable);

    Page<RecipeEntity> findAllByRecipeNameContaining(String query, Pageable pageable);

    List<RecipeEntity> findAllByRecipeNameContaining(String query);
}
