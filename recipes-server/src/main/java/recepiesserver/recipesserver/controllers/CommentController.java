package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.commentDTOs.*;
import recepiesserver.recipesserver.services.CommentService;
import recepiesserver.recipesserver.utils.constants.Api;
import recepiesserver.recipesserver.utils.validators.validCommentIdValidator.ValidCommentId;
import recepiesserver.recipesserver.utils.validators.validRecipeIdValidator.ValidRecipeId;

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
    public ResponseEntity<List<CommentDetailsDTO>> getAllCommentsForTargetRecipe(
            @PathVariable @ValidRecipeId Long recipeId) {
        return ResponseEntity.ok().body(this.commentService.getAllCommentsForTargetRecipe(recipeId));
    }

    @PostMapping(Api.COMMENT_ENDPOINT)
    public ResponseEntity<CommentIdDTO> createComment(@RequestBody @Valid CommentCreateDTO commentDTO) {
        CommentIdDTO createdCommentId = this.commentService.createNewComment(commentDTO);
        return ResponseEntity.ok().body(createdCommentId);
    }

    @DeleteMapping(Api.DELETE_COMMENT)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @commentService.getCommentOwnerUsername(#id)) " +
            "|| hasRole('ADMINISTRATOR') || hasRole('MODERATOR')")
    public ResponseEntity<CommentModifyDTO> deleteComment(@PathVariable @ValidCommentId Long id,
                                                          HttpServletRequest request) {
        CommentModifyDTO modifiedAt = this.commentService.deleteComment(id);
        return ResponseEntity.ok().body(modifiedAt);
    }

    @PutMapping(Api.EDIT_COMMENT)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @commentService.getCommentOwnerUsername(#id)) " +
            "|| hasRole('ADMINISTRATOR') || hasRole('MODERATOR')")
    public ResponseEntity<CommentIdDTO> editComment(@RequestBody @Valid CommentEditDTO commentDTO,
                                                    @PathVariable @ValidCommentId Long id,
                                                    HttpServletRequest request) {
        CommentIdDTO editedCommentId = this.commentService.editComment(commentDTO, id);
        return ResponseEntity.ok().body(editedCommentId);
    }

    @GetMapping(Api.LATEST_SIX_COMMENTS)
    public ResponseEntity<List<CommentDetailsDTO>> getTheLatestSixComments() {
        return ResponseEntity.ok().body(this.commentService.getTheLatestSixComments());
    }

    @GetMapping(Api.COMMENT_COUNT)
    public ResponseEntity<CommentCountDTO> totalCommentsCount() {
        return ResponseEntity.ok(this.commentService.getTotalCommentsCount());
    }

    @GetMapping(Api.SEARCH_COMMENTS_BY_CONTENT)
    public ResponseEntity<List<CommentDetailsDTO>> searchCommentsByContent(
            @RequestParam(name = "whereContent") String content) {
        return ResponseEntity.ok().body(this.commentService.findCommentsByContent(content));
    }
}