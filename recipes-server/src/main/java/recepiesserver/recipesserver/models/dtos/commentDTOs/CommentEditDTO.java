package recepiesserver.recipesserver.models.dtos.commentDTOs;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class CommentEditDTO {
    private Long id;
    private String content;

    @NotNull
    @Positive
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotBlank
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
