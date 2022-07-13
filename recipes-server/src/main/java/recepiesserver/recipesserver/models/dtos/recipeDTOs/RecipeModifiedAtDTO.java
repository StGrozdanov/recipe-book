package recepiesserver.recipesserver.models.dtos.recipeDTOs;

import java.time.LocalDateTime;

public class RecipeModifiedAtDTO {
    private LocalDateTime modifiedAt;

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public RecipeModifiedAtDTO setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }
}
