package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentCreateDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentDetailsDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentEditDTO;
import recepiesserver.recipesserver.models.entities.CommentEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.repositories.CommentRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final RecipeService recipeService;

    public CommentService(CommentRepository commentRepository, ModelMapper modelMapper, UserService userService, RecipeService recipeService) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.recipeService = recipeService;
    }

    public List<CommentDetailsDTO> getAllCommentsForTargetRecipe(Long recipeId) {
        return this.commentRepository
                .findAllByTargetRecipe_Id(recipeId)
                .stream()
                .map(comment -> this.modelMapper.map(comment, CommentDetailsDTO.class))
                .toList();
    }

    public Long createNewComment(CommentCreateDTO commentDTO) {
        Optional<UserEntity> userById = this.userService.findUserById(commentDTO.getOwnerId());
        Optional<RecipeEntity> recipeById = this.recipeService.findRecipeById(commentDTO.getTargetRecipeId());

        if (userById.isPresent() && recipeById.isPresent()) {
            CommentEntity createdComment = this.modelMapper.map(commentDTO, CommentEntity.class);
            createdComment.setOwner(userById.get());
            createdComment.setTargetRecipe(recipeById.get());

            return this.commentRepository.save(createdComment).getId();
        }
        return null;
    }

    @Transactional
    public void deleteComment(Long id) {
        this.commentRepository.deleteById(id);
    }

    @Transactional
    public Long editComment(CommentEditDTO commentDTO) {
        Optional<CommentEntity> commentById = this.commentRepository.findById(commentDTO.getId());

        if (commentById.isPresent()) {
            CommentEntity oldComment = commentById.get();
            CommentEntity editedComment = this.modelMapper.map(commentDTO, CommentEntity.class);

            editedComment.setCreatedAt(oldComment.getCreatedAt());
            editedComment.setOwner(oldComment.getOwner());
            editedComment.setTargetRecipe(oldComment.getTargetRecipe());

            return this.commentRepository.save(editedComment).getId();
        }
        return null;
    }

    public List<CommentDetailsDTO> getTheLatestSixComments() {
        return this.commentRepository
                .findTop6ByOrderByCreatedAtDesc()
                .stream()
                .map(comment -> this.modelMapper.map(comment, CommentDetailsDTO.class))
                .toList();
    }

    public long getTotalCommentsCount() {
        return this.commentRepository.count();
    }

    public Integer getUserCommentCount(Long mostActiveUser) {
        return Math.toIntExact(this.commentRepository.countAllByOwner_Id(mostActiveUser));
    }

    public List<CommentDetailsDTO> findCommentsByContent(String content) {
        return this.commentRepository
                .findAllByContentContaining(content)
                .stream()
                .map(comment -> this.modelMapper.map(comment, CommentDetailsDTO.class))
                .toList();
    }

    @Transactional
    public String getCommentOwnerUsername(Long id) {
        return this.commentRepository.findById(id).orElseThrow().getOwner().getUsername();
    }
}
