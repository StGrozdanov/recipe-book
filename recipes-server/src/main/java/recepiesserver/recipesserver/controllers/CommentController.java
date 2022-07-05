package recepiesserver.recipesserver.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentDTO;
import recepiesserver.recipesserver.services.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<List<CommentDTO>> getAllCommentsForTargetRecipe(@PathVariable Long recipeId) {
        return ResponseEntity.ok().body(this.commentService.getAllCommentsForTargetRecipe(recipeId));
    }
}
