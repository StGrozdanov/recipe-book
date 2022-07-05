package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentDTO;
import recepiesserver.recipesserver.repositories.CommentRepository;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;

    public CommentService(CommentRepository commentRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    public List<CommentDTO> getAllCommentsForTargetRecipe(Long recipeId) {
        return this.commentRepository
                .findAllByTargetRecipe_Id(recipeId)
                .stream()
                .map(comment -> this.modelMapper.map(comment, CommentDTO.class))
                .toList();
    }
}
