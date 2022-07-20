package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.events.DeleteUserEvent;
import recepiesserver.recipesserver.events.GlobalSearchEvent;
import recepiesserver.recipesserver.exceptions.commentExceptions.CommentNotFoundException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeNotFoundException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.commentDTOs.*;
import recepiesserver.recipesserver.models.dtos.globalSearchDTOs.AdminGlobalSearchDTO;
import recepiesserver.recipesserver.models.entities.CommentEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.repositories.CommentRepository;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
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

    public CommentIdDTO createNewComment(CommentCreateDTO commentDTO) {
        UserEntity userById = this.userService
                .findUserById(commentDTO.getOwnerId())
                .orElseThrow(() -> new UserNotFoundException(ExceptionMessages.USER_NOT_FOUND));

        RecipeEntity recipeById = this.recipeService
                .findRecipeById(commentDTO.getTargetRecipeId())
                .orElseThrow(() -> new RecipeNotFoundException(ExceptionMessages.RECIPE_NOT_FOUND));

        CommentEntity createdComment = this.modelMapper.map(commentDTO, CommentEntity.class);
        createdComment.setOwner(userById);
        createdComment.setTargetRecipe(recipeById);

        CommentEntity savedComment = this.commentRepository.save(createdComment);
        return this.modelMapper.map(savedComment, CommentIdDTO.class);
    }

    @Transactional
    public CommentModifiedAtDTO deleteComment(@NotNull Long id) {
        this.commentRepository.deleteById(id);
        LocalDateTime modifiedAt = LocalDateTime.now();
        return new CommentModifiedAtDTO().setModifiedAt(modifiedAt);
    }

    @Transactional
    public CommentIdDTO editComment(CommentEditDTO commentDTO, Long id) {
        CommentEntity oldComment = this.commentRepository
                .findById(id)
                .orElseThrow(() -> new CommentNotFoundException(ExceptionMessages.COMMENT_NOT_FOUND));

        oldComment.setContent(commentDTO.getContent());
        return this.modelMapper.map(oldComment, CommentIdDTO.class);
    }

    public List<CommentDetailsDTO> getTheLatestSixComments() {
        return this.commentRepository
                .findTop6ByOrderByCreatedAtDesc()
                .stream()
                .map(comment -> this.modelMapper.map(comment, CommentDetailsDTO.class))
                .toList();
    }

    public CommentCountDTO getTotalCommentsCount() {
        long commentCount = this.commentRepository.count();
        return new CommentCountDTO().setCount(commentCount);
    }

    public Integer getUserCommentCount(Long mostActiveUser) {
        return Math.toIntExact(this.commentRepository.countAllByOwner_Id(mostActiveUser));
    }

    public Page<CommentAdminPanelDTO> findCommentsByContent(String content, Integer pageNumber, Integer collectionCount, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, collectionCount, Sort.by(sortBy));
        return this.commentRepository
                .findAllByContentContaining(content, pageable)
                .map(comment -> this.modelMapper.map(comment, CommentAdminPanelDTO.class));
    }

    @Order(1)
    @EventListener(GlobalSearchEvent.class)
    public void findCommentsByContentGlobalSearch(GlobalSearchEvent event) {
        List<AdminGlobalSearchDTO> commentCollection = this.commentRepository
                .findAllByContentContaining(event.getQuery())
                .stream()
                .map(comment -> new AdminGlobalSearchDTO(comment.getContent(), "", "Avatar.png", "comments"))
                .toList();
        event.getSearchResults().addAll(commentCollection);
    }

    @Transactional
    public String getCommentOwnerUsername(Long id) {
        return this.commentRepository
                .findById(id)
                .orElseThrow(() -> new CommentNotFoundException(ExceptionMessages.COMMENT_NOT_FOUND))
                .getOwner()
                .getUsername();
    }

    public Optional<CommentEntity> findCommentById(Long value) {
        return this.commentRepository.findById(value);
    }

    @Order(1)
    @EventListener(DeleteUserEvent.class)
    @Modifying
    public void cleanUpUserComments(DeleteUserEvent event) {
        Long userId = event.getUserId();
        UserEntity userEntity = this.userService.findUserById(userId).orElseThrow();
        List<CommentEntity> commentsFromOwner = this.commentRepository.findAllByOwner(userEntity);
        this.commentRepository.deleteAll(commentsFromOwner);
        System.out.println();
    }

    public Page<CommentAdminPanelDTO> getAllRecipes(Integer pageNumber, Integer collectionCount, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, collectionCount, Sort.by(sortBy));
        return this.commentRepository
                .findAll(pageable)
                .map(comment -> this.modelMapper.map(comment, CommentAdminPanelDTO.class));
    }
}