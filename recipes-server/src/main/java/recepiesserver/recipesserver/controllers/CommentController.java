package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentCreateDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentDetailsDTO;
import recepiesserver.recipesserver.services.CommentService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<List<CommentDetailsDTO>> getAllCommentsForTargetRecipe(@PathVariable Long recipeId) {
        return ResponseEntity.ok().body(this.commentService.getAllCommentsForTargetRecipe(recipeId));
    }

    @PostMapping
    public ResponseEntity<Long> createComment(@RequestBody @Valid CommentCreateDTO commentDTO) {
        Long createdCommentId = this.commentService.createNewComment(commentDTO);

        return createdCommentId != null
                ? ResponseEntity.ok().body(createdCommentId)
                : ResponseEntity.unprocessableEntity().build();
    }
}
