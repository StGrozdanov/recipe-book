package recepiesserver.recipesserver.models.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class CommentEntity extends BaseEntity {
    private String content;
    private LocalDateTime createdAt;
    private RecipeEntity targetRecipe;
    private UserEntity owner;

    @Column(nullable = false, columnDefinition = "TEXT")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "created_at", nullable = false)
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @ManyToOne
    @JoinColumn(nullable = false)
    public RecipeEntity getTargetRecipe() {
        return targetRecipe;
    }

    public void setTargetRecipe(RecipeEntity targetRecipe) {
        this.targetRecipe = targetRecipe;
    }

    @ManyToOne
    @JoinColumn(nullable = false)
    public UserEntity getOwner() {
        return owner;
    }

    public void setOwner(UserEntity owner) {
        this.owner = owner;
    }
}
