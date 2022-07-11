package recepiesserver.recipesserver.controllers;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentCreateDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentDetailsDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentEditDTO;
import recepiesserver.recipesserver.services.CommentService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(Api.GET_ALL_RECIPE_COMMENTS)
    public ResponseEntity<List<CommentDetailsDTO>> getAllCommentsForTargetRecipe(@PathVariable Long recipeId) {
        return ResponseEntity.ok().body(this.commentService.getAllCommentsForTargetRecipe(recipeId));
    }

    @PostMapping(Api.COMMENT_ENDPOINT)
    public ResponseEntity<Long> createComment(@RequestBody @Valid CommentCreateDTO commentDTO) {
        Long createdCommentId = this.commentService.createNewComment(commentDTO);

        return createdCommentId != null
                ? ResponseEntity.ok().body(createdCommentId)
                : ResponseEntity.unprocessableEntity().build();
    }

    @DeleteMapping(Api.DELETE_COMMENT)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @commentService.getCommentOwnerUsername(#id)) " +
            "|| hasRole('ADMINISTRATOR') || hasRole('MODERATOR')")
    public ResponseEntity<?> deleteComment(@PathVariable Long id, HttpServletRequest request) {
        try {
            this.commentService.deleteComment(id);
        } catch (EmptyResultDataAccessException | IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping(Api.EDIT_COMMENT)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @commentService.getCommentOwnerUsername(#id)) " +
            "|| hasRole('ADMINISTRATOR') || hasRole('MODERATOR')")
    public ResponseEntity<Long> editComment(@RequestBody @Valid CommentEditDTO commentDTO,
                                            HttpServletRequest request,
                                            @PathVariable Long id) {
        Long editedCommentId = this.commentService.editComment(commentDTO, id);

        return editedCommentId != null
                ? ResponseEntity.ok().body(editedCommentId)
                : ResponseEntity.unprocessableEntity().build();
    }

    @GetMapping(Api.LATEST_SIX_COMMENTS)
    public ResponseEntity<List<CommentDetailsDTO>> getTheLatestSixComments() {
        return ResponseEntity
                .ok()
                .body(this.commentService.getTheLatestSixComments());
    }

    @GetMapping(Api.COMMENT_COUNT)
    public ResponseEntity<Long> totalCommentsCount() {
        return ResponseEntity.ok(this.commentService.getTotalCommentsCount());
    }

    @GetMapping(Api.SEARCH_COMMENTS_BY_CONTENT)
    public ResponseEntity<List<CommentDetailsDTO>> searchCommentsByContent(
            @RequestParam(name = "whereContent") String content) {
        return ResponseEntity.ok().body(this.commentService.findCommentsByContent(content));
    }
}