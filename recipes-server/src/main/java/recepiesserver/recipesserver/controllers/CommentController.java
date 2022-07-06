package recepiesserver.recipesserver.controllers;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentCreateDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentDetailsDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentEditDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserAdminPanelDTO;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<CommentDetailsDTO> deleteComment(@PathVariable Long id) {
        try {
            this.commentService.deleteComment(id);
        } catch (EmptyResultDataAccessException | IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Long> editComment(@RequestBody @Valid CommentEditDTO commentDTO) {
        Long editedCommentId = this.commentService.editComment(commentDTO);

        return editedCommentId != null
                ? ResponseEntity.ok().body(editedCommentId)
                : ResponseEntity.unprocessableEntity().build();
    }

    @GetMapping("/latest-six-comments")
    public ResponseEntity<List<CommentDetailsDTO>> getTheLatestSixComments() {
        return ResponseEntity
                .ok()
                .body(this.commentService.getTheLatestSixComments());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> totalCommentsCount() {
        return ResponseEntity.ok(this.commentService.getTotalCommentsCount());
    }

    @GetMapping("/searchByContent")
    public ResponseEntity<List<CommentDetailsDTO>> searchCommentsByContent(
            @RequestParam(name = "whereContent") String content) {
        return ResponseEntity.ok().body(this.commentService.findCommentsByContent(content));
    }
}