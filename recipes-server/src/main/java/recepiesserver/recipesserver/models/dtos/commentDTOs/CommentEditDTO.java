package recepiesserver.recipesserver.models.dtos.commentDTOs;

import javax.validation.constraints.NotBlank;

public class CommentEditDTO {
    private String content;

    @NotBlank
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
