package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recepiesserver.recipesserver.events.DeleteUserEvent;
import recepiesserver.recipesserver.events.GlobalSearchEvent;
import recepiesserver.recipesserver.exceptions.commentExceptions.CommentNotFoundException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentAdminPanelDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentCreateDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentDetailsDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentEditDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentIdDTO;
import recepiesserver.recipesserver.models.dtos.globalSearchDTOs.AdminGlobalSearchDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserSummaryDTO;
import recepiesserver.recipesserver.models.entities.CommentEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.repositories.CommentRepository;

@ContextConfiguration(classes = {CommentService.class})
@ExtendWith(SpringExtension.class)
class CommentServiceTest {
    @MockBean
    private CommentRepository commentRepository;

    @Autowired
    private CommentService commentService;

    @MockBean
    private ModelMapper modelMapper;

    @MockBean
    private RecipeService recipeService;

    @MockBean
    private UserService userService;

    @Test
    void testGetAllCommentsForTargetRecipeWorksAsExpectedUponEmptyCollection() {
        when(commentRepository.findAllByTargetRecipe_Id((Long) any())).thenReturn(new ArrayList<>());
        assertTrue(commentService.getAllCommentsForTargetRecipe(123L).isEmpty());
        verify(commentRepository).findAllByTargetRecipe_Id((Long) any());
    }

    @Test
    void testGetAllCommentsForTargetRecipeFirstCase() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);

        ArrayList<CommentEntity> commentEntityList = new ArrayList<>();
        commentEntityList.add(commentEntity);
        when(commentRepository.findAllByTargetRecipe_Id((Long) any())).thenReturn(commentEntityList);

        UserSummaryDTO userSummaryDTO = new UserSummaryDTO();
        userSummaryDTO.setAvatarUrl("https://example.org/example");
        userSummaryDTO.setId(123L);
        userSummaryDTO.setUsername("janedoe");

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");

        CommentDetailsDTO commentDetailsDTO = new CommentDetailsDTO();
        commentDetailsDTO.setContent("Not all who wander are lost");
        commentDetailsDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentDetailsDTO.setId(123L);
        commentDetailsDTO.setOwner(userSummaryDTO);
        commentDetailsDTO.setRecipe(recipeCatalogueDTO);
        when(modelMapper.map((Object) any(), (Class<CommentDetailsDTO>) any())).thenReturn(commentDetailsDTO);
        assertEquals(1, commentService.getAllCommentsForTargetRecipe(123L).size());
        verify(commentRepository).findAllByTargetRecipe_Id((Long) any());
        verify(modelMapper).map((Object) any(), (Class<CommentDetailsDTO>) any());
    }

    /**
     * Method under test: {@link CommentService#getAllCommentsForTargetRecipe(Long)}
     */
    @Test
    void testGetAllCommentsForTargetRecipeSecondCase() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");

        RecipeEntity recipeEntity1 = new RecipeEntity();
        recipeEntity1.setCategory(CategoryEnum.CHICKEN);
        recipeEntity1.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity1.setId(123L);
        recipeEntity1.setImageUrl("https://example.org/example");
        recipeEntity1.setOwnerId(123L);
        recipeEntity1.setProducts(new ArrayList<>());
        recipeEntity1.setRecipeName("Recipe Name");
        recipeEntity1.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity1.setSteps(new ArrayList<>());
        recipeEntity1.setVisitationsCount(3L);

        CommentEntity commentEntity1 = new CommentEntity();
        commentEntity1.setContent("Not all who wander are lost");
        commentEntity1.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity1.setId(123L);
        commentEntity1.setOwner(userEntity1);
        commentEntity1.setTargetRecipe(recipeEntity1);

        ArrayList<CommentEntity> commentEntityList = new ArrayList<>();
        commentEntityList.add(commentEntity1);
        commentEntityList.add(commentEntity);
        when(commentRepository.findAllByTargetRecipe_Id((Long) any())).thenReturn(commentEntityList);

        UserSummaryDTO userSummaryDTO = new UserSummaryDTO();
        userSummaryDTO.setAvatarUrl("https://example.org/example");
        userSummaryDTO.setId(123L);
        userSummaryDTO.setUsername("janedoe");

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");

        CommentDetailsDTO commentDetailsDTO = new CommentDetailsDTO();
        commentDetailsDTO.setContent("Not all who wander are lost");
        commentDetailsDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentDetailsDTO.setId(123L);
        commentDetailsDTO.setOwner(userSummaryDTO);
        commentDetailsDTO.setRecipe(recipeCatalogueDTO);
        when(modelMapper.map((Object) any(), (Class<CommentDetailsDTO>) any())).thenReturn(commentDetailsDTO);
        assertEquals(2, commentService.getAllCommentsForTargetRecipe(123L).size());
        verify(commentRepository).findAllByTargetRecipe_Id((Long) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<CommentDetailsDTO>) any());
    }

    @Test
    void testCreateNewComment() {
        when(commentRepository.save((CommentEntity) any())).thenThrow(new CommentNotFoundException("An error occurred"));

        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);
        when(modelMapper.map((Object) any(), (Class<CommentEntity>) any())).thenReturn(commentEntity);

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        Optional<UserEntity> ofResult = Optional.of(userEntity1);
        when(userService.findUserById((Long) any())).thenReturn(ofResult);

        RecipeEntity recipeEntity1 = new RecipeEntity();
        recipeEntity1.setCategory(CategoryEnum.CHICKEN);
        recipeEntity1.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity1.setId(123L);
        recipeEntity1.setImageUrl("https://example.org/example");
        recipeEntity1.setOwnerId(123L);
        recipeEntity1.setProducts(new ArrayList<>());
        recipeEntity1.setRecipeName("Recipe Name");
        recipeEntity1.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity1.setSteps(new ArrayList<>());
        recipeEntity1.setVisitationsCount(3L);
        Optional<RecipeEntity> ofResult1 = Optional.of(recipeEntity1);
        when(recipeService.findRecipeById((Long) any())).thenReturn(ofResult1);

        CommentCreateDTO commentCreateDTO = new CommentCreateDTO();
        commentCreateDTO.setContent("Not all who wander are lost");
        commentCreateDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentCreateDTO.setOwnerId(123L);
        commentCreateDTO.setTargetRecipeId(123L);
        assertThrows(CommentNotFoundException.class, () -> commentService.createNewComment(commentCreateDTO));
        verify(commentRepository).save((CommentEntity) any());
        verify(modelMapper).map((Object) any(), (Class<CommentEntity>) any());
        verify(userService).findUserById((Long) any());
        verify(recipeService).findRecipeById((Long) any());
    }

    @Test
    void testDeleteComment() {
        doNothing().when(commentRepository).deleteById((Long) any());
        commentService.deleteComment(123L);
        verify(commentRepository).deleteById((Long) any());
    }

    @Test
    void testDeleteCommentShouldThrow() {
        doThrow(new CommentNotFoundException("An error occurred")).when(commentRepository).deleteById((Long) any());
        assertThrows(CommentNotFoundException.class, () -> commentService.deleteComment(123L));
        verify(commentRepository).deleteById((Long) any());
    }

    @Test
    void testEditComment() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);
        Optional<CommentEntity> ofResult = Optional.of(commentEntity);
        when(commentRepository.findById((Long) any())).thenReturn(ofResult);

        CommentIdDTO commentIdDTO = new CommentIdDTO();
        commentIdDTO.setId(123L);
        when(modelMapper.map((Object) any(), (Class<CommentIdDTO>) any())).thenReturn(commentIdDTO);

        CommentEditDTO commentEditDTO = new CommentEditDTO();
        commentEditDTO.setContent("Not all who wander are lost");
        assertSame(commentIdDTO, commentService.editComment(commentEditDTO, 123L));
        verify(commentRepository).findById((Long) any());
        verify(modelMapper).map((Object) any(), (Class<CommentIdDTO>) any());
    }

    @Test
    void testEditCommentShouldThrow() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);
        Optional<CommentEntity> ofResult = Optional.of(commentEntity);
        when(commentRepository.findById((Long) any())).thenReturn(ofResult);
        when(modelMapper.map((Object) any(), (Class<CommentIdDTO>) any()))
                .thenThrow(new CommentNotFoundException("An error occurred"));

        CommentEditDTO commentEditDTO = new CommentEditDTO();
        commentEditDTO.setContent("Not all who wander are lost");
        assertThrows(CommentNotFoundException.class, () -> commentService.editComment(commentEditDTO, 123L));
        verify(commentRepository).findById((Long) any());
        verify(modelMapper).map((Object) any(), (Class<CommentIdDTO>) any());
    }

    @Test
    void testGetTheLatestSixCommentsWorksAsExpectedUponEmptyCollection() {
        when(commentRepository.findTop6ByOrderByCreatedAtDesc()).thenReturn(new ArrayList<>());
        assertTrue(commentService.getTheLatestSixComments().isEmpty());
        verify(commentRepository).findTop6ByOrderByCreatedAtDesc();
    }

    @Test
    void testGetTheLatestSixComments() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);

        ArrayList<CommentEntity> commentEntityList = new ArrayList<>();
        commentEntityList.add(commentEntity);
        when(commentRepository.findTop6ByOrderByCreatedAtDesc()).thenReturn(commentEntityList);

        UserSummaryDTO userSummaryDTO = new UserSummaryDTO();
        userSummaryDTO.setAvatarUrl("https://example.org/example");
        userSummaryDTO.setId(123L);
        userSummaryDTO.setUsername("janedoe");

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");

        CommentDetailsDTO commentDetailsDTO = new CommentDetailsDTO();
        commentDetailsDTO.setContent("Not all who wander are lost");
        commentDetailsDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentDetailsDTO.setId(123L);
        commentDetailsDTO.setOwner(userSummaryDTO);
        commentDetailsDTO.setRecipe(recipeCatalogueDTO);
        when(modelMapper.map((Object) any(), (Class<CommentDetailsDTO>) any())).thenReturn(commentDetailsDTO);
        assertEquals(1, commentService.getTheLatestSixComments().size());
        verify(commentRepository).findTop6ByOrderByCreatedAtDesc();
        verify(modelMapper).map((Object) any(), (Class<CommentDetailsDTO>) any());
    }

    @Test
    void testGetTotalCommentsCount() {
        when(commentRepository.count()).thenReturn(3L);
        assertEquals(3L, commentService.getTotalCommentsCount().getCount().longValue());
        verify(commentRepository).count();
    }

    @Test
    void testGetTotalCommentsCountShouldThrow() {
        when(commentRepository.count()).thenThrow(new CommentNotFoundException("An error occurred"));
        assertThrows(CommentNotFoundException.class, () -> commentService.getTotalCommentsCount());
        verify(commentRepository).count();
    }

    @Test
    void testGetUserCommentCount() {
        when(commentRepository.countAllByOwner_Id((Long) any())).thenReturn(3L);
        assertEquals(3, commentService.getUserCommentCount(3L).intValue());
        verify(commentRepository).countAllByOwner_Id((Long) any());
    }

    @Test
    void testGetUserCommentCountShouldThrow() {
        when(commentRepository.countAllByOwner_Id((Long) any()))
                .thenThrow(new CommentNotFoundException("An error occurred"));
        assertThrows(CommentNotFoundException.class, () -> commentService.getUserCommentCount(3L));
        verify(commentRepository).countAllByOwner_Id((Long) any());
    }

    @Test
    void testFindCommentsByContentWorksAsExpectedUponEmptyCollection() {
        when(commentRepository.findAllByContentContaining((String) any(), (Pageable) any()))
                .thenReturn(new PageImpl<>(new ArrayList<>()));
        assertTrue(
                commentService.findCommentsByContent("Not all who wander are lost", 10, 3, "Sort By").toList().isEmpty());
        verify(commentRepository).findAllByContentContaining((String) any(), (Pageable) any());
    }

    @Test
    void testFindCommentsByContent() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);

        ArrayList<CommentEntity> commentEntityList = new ArrayList<>();
        commentEntityList.add(commentEntity);
        PageImpl<CommentEntity> pageImpl = new PageImpl<>(commentEntityList);
        when(commentRepository.findAllByContentContaining((String) any(), (Pageable) any())).thenReturn(pageImpl);

        CommentAdminPanelDTO commentAdminPanelDTO = new CommentAdminPanelDTO();
        commentAdminPanelDTO.setContent("Not all who wander are lost");
        commentAdminPanelDTO.setId(123L);
        commentAdminPanelDTO.setOwnerAvatarUrl("https://example.org/example");
        commentAdminPanelDTO.setOwnerId(123L);
        commentAdminPanelDTO.setTargetRecipeId(123L);
        when(modelMapper.map((Object) any(), (Class<CommentAdminPanelDTO>) any())).thenReturn(commentAdminPanelDTO);
        assertEquals(1,
                commentService.findCommentsByContent("Not all who wander are lost", 10, 3, "Sort By").toList().size());
        verify(commentRepository).findAllByContentContaining((String) any(), (Pageable) any());
        verify(modelMapper).map((Object) any(), (Class<CommentAdminPanelDTO>) any());
    }

    @Test
    void testFindCommentsByContentGlobalSearchWorksAsExpectedUponEmptyCollection() {
        when(commentRepository.findAllByContentContaining((String) any())).thenReturn(new ArrayList<>());
        GlobalSearchEvent globalSearchEvent = new GlobalSearchEvent("Source", "Query");

        commentService.findCommentsByContentGlobalSearch(globalSearchEvent);
        verify(commentRepository).findAllByContentContaining((String) any());
        assertTrue(globalSearchEvent.getSearchResults().isEmpty());
    }

    @Test
    void testFindCommentsByContentGlobalSearch() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);

        ArrayList<CommentEntity> commentEntityList = new ArrayList<>();
        commentEntityList.add(commentEntity);
        when(commentRepository.findAllByContentContaining((String) any())).thenReturn(commentEntityList);
        GlobalSearchEvent globalSearchEvent = new GlobalSearchEvent("Source", "Query");

        commentService.findCommentsByContentGlobalSearch(globalSearchEvent);
        verify(commentRepository).findAllByContentContaining((String) any());
        List<AdminGlobalSearchDTO> searchResults = globalSearchEvent.getSearchResults();
        assertEquals(1, searchResults.size());
        AdminGlobalSearchDTO getResult = searchResults.get(0);
        assertEquals("Not all who wander are lost", getResult.getName());
        assertEquals("comments", getResult.getResultType());
    }

    @Test
    void testFindCommentsByContentGlobalSearchShouldThrow() {
        when(commentRepository.findAllByContentContaining((String) any()))
                .thenThrow(new CommentNotFoundException("An error occurred"));
        assertThrows(CommentNotFoundException.class,
                () -> commentService.findCommentsByContentGlobalSearch(new GlobalSearchEvent("Source", "Query")));
        verify(commentRepository).findAllByContentContaining((String) any());
    }

    @Test
    void testGetCommentOwnerUsername() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);
        Optional<CommentEntity> ofResult = Optional.of(commentEntity);
        when(commentRepository.findById((Long) any())).thenReturn(ofResult);
        assertEquals("janedoe", commentService.getCommentOwnerUsername(123L));
        verify(commentRepository).findById((Long) any());
    }

    @Test
    void testGetCommentOwnerUsernameSecondCase() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);
        UserEntity userEntity1 = mock(UserEntity.class);
        when(userEntity1.getUsername()).thenReturn("janedoe");
        doNothing().when(userEntity1).setId((Long) any());
        doNothing().when(userEntity1).setAvatarUrl((String) any());
        doNothing().when(userEntity1).setBlocked((Boolean) any());
        doNothing().when(userEntity1).setEmail((String) any());
        doNothing().when(userEntity1).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity1).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity1).setPassword((String) any());
        doNothing().when(userEntity1).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity1).setUsername((String) any());
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");
        CommentEntity commentEntity = mock(CommentEntity.class);
        when(commentEntity.getOwner()).thenReturn(userEntity1);
        doNothing().when(commentEntity).setId((Long) any());
        doNothing().when(commentEntity).setContent((String) any());
        doNothing().when(commentEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(commentEntity).setOwner((UserEntity) any());
        doNothing().when(commentEntity).setTargetRecipe((RecipeEntity) any());
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);
        Optional<CommentEntity> ofResult = Optional.of(commentEntity);
        when(commentRepository.findById((Long) any())).thenReturn(ofResult);
        assertEquals("janedoe", commentService.getCommentOwnerUsername(123L));
        verify(commentRepository).findById((Long) any());
        verify(commentEntity).getOwner();
        verify(commentEntity).setId((Long) any());
        verify(commentEntity).setContent((String) any());
        verify(commentEntity).setCreatedAt((LocalDateTime) any());
        verify(commentEntity).setOwner((UserEntity) any());
        verify(commentEntity).setTargetRecipe((RecipeEntity) any());
        verify(userEntity1).getUsername();
        verify(userEntity1).setId((Long) any());
        verify(userEntity1).setAvatarUrl((String) any());
        verify(userEntity1).setBlocked((Boolean) any());
        verify(userEntity1).setEmail((String) any());
        verify(userEntity1).setFavourites((List<RecipeEntity>) any());
        verify(userEntity1).setIpAddresses((Set<String>) any());
        verify(userEntity1).setPassword((String) any());
        verify(userEntity1).setRoles((List<RoleEntity>) any());
        verify(userEntity1).setUsername((String) any());
    }

    @Test
    void testFindCommentById() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);
        Optional<CommentEntity> ofResult = Optional.of(commentEntity);
        when(commentRepository.findById((Long) any())).thenReturn(ofResult);
        Optional<CommentEntity> actualFindCommentByIdResult = commentService.findCommentById(42L);
        assertSame(ofResult, actualFindCommentByIdResult);
        assertTrue(actualFindCommentByIdResult.isPresent());
        verify(commentRepository).findById((Long) any());
    }

    @Test
    void testFindCommentByIdShouldThrow() {
        when(commentRepository.findById((Long) any())).thenThrow(new CommentNotFoundException("An error occurred"));
        assertThrows(CommentNotFoundException.class, () -> commentService.findCommentById(42L));
        verify(commentRepository).findById((Long) any());
    }

    @Test
    void testCleanUpUserComments() {
        when(commentRepository.findAllByOwner((UserEntity) any())).thenReturn(new ArrayList<>());
        doNothing().when(commentRepository).deleteAll((Iterable<CommentEntity>) any());

        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        commentService.cleanUpUserComments(new DeleteUserEvent("Source", 123L));
        verify(commentRepository).findAllByOwner((UserEntity) any());
        verify(commentRepository).deleteAll((Iterable<CommentEntity>) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testCleanUpUserCommentsShouldThrow() {
        when(commentRepository.findAllByOwner((UserEntity) any()))
                .thenThrow(new UserNotFoundException("An error occurred"));
        doThrow(new UserNotFoundException("An error occurred")).when(commentRepository)
                .deleteAll((Iterable<CommentEntity>) any());

        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        assertThrows(UserNotFoundException.class,
                () -> commentService.cleanUpUserComments(new DeleteUserEvent("Source", 123L)));
        verify(commentRepository).findAllByOwner((UserEntity) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testGetAllRecipes() {
        when(commentRepository.findAll((Pageable) any())).thenReturn(new PageImpl<>(new ArrayList<>()));
        assertTrue(commentService.getAllRecipes(10, 3, "Sort By").toList().isEmpty());
        verify(commentRepository).findAll((Pageable) any());
    }

    @Test
    void testGetAllRecipesCaseSecond() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);

        ArrayList<CommentEntity> commentEntityList = new ArrayList<>();
        commentEntityList.add(commentEntity);
        PageImpl<CommentEntity> pageImpl = new PageImpl<>(commentEntityList);
        when(commentRepository.findAll((Pageable) any())).thenReturn(pageImpl);

        CommentAdminPanelDTO commentAdminPanelDTO = new CommentAdminPanelDTO();
        commentAdminPanelDTO.setContent("Not all who wander are lost");
        commentAdminPanelDTO.setId(123L);
        commentAdminPanelDTO.setOwnerAvatarUrl("https://example.org/example");
        commentAdminPanelDTO.setOwnerId(123L);
        commentAdminPanelDTO.setTargetRecipeId(123L);
        when(modelMapper.map((Object) any(), (Class<CommentAdminPanelDTO>) any())).thenReturn(commentAdminPanelDTO);
        assertEquals(1, commentService.getAllRecipes(10, 3, "Sort By").toList().size());
        verify(commentRepository).findAll((Pageable) any());
        verify(modelMapper).map((Object) any(), (Class<CommentAdminPanelDTO>) any());
    }

    @Test
    void testGetAllRecipesCaseThree() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeEntity recipeEntity = new RecipeEntity();
        recipeEntity.setCategory(CategoryEnum.CHICKEN);
        recipeEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity.setId(123L);
        recipeEntity.setImageUrl("https://example.org/example");
        recipeEntity.setOwnerId(123L);
        recipeEntity.setProducts(new ArrayList<>());
        recipeEntity.setRecipeName("Recipe Name");
        recipeEntity.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity.setSteps(new ArrayList<>());
        recipeEntity.setVisitationsCount(3L);

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setContent("Not all who wander are lost");
        commentEntity.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity.setId(123L);
        commentEntity.setOwner(userEntity);
        commentEntity.setTargetRecipe(recipeEntity);

        UserEntity userEntity1 = new UserEntity();
        userEntity1.setAvatarUrl("https://example.org/example");
        userEntity1.setBlocked(true);
        userEntity1.setEmail("jane.doe@example.org");
        userEntity1.setFavourites(new ArrayList<>());
        userEntity1.setId(123L);
        userEntity1.setIpAddresses(new HashSet<>());
        userEntity1.setPassword("iloveyou");
        userEntity1.setRoles(new ArrayList<>());
        userEntity1.setUsername("janedoe");

        RecipeEntity recipeEntity1 = new RecipeEntity();
        recipeEntity1.setCategory(CategoryEnum.CHICKEN);
        recipeEntity1.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity1.setId(123L);
        recipeEntity1.setImageUrl("https://example.org/example");
        recipeEntity1.setOwnerId(123L);
        recipeEntity1.setProducts(new ArrayList<>());
        recipeEntity1.setRecipeName("Recipe Name");
        recipeEntity1.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity1.setSteps(new ArrayList<>());
        recipeEntity1.setVisitationsCount(3L);

        CommentEntity commentEntity1 = new CommentEntity();
        commentEntity1.setContent("Not all who wander are lost");
        commentEntity1.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        commentEntity1.setId(123L);
        commentEntity1.setOwner(userEntity1);
        commentEntity1.setTargetRecipe(recipeEntity1);

        ArrayList<CommentEntity> commentEntityList = new ArrayList<>();
        commentEntityList.add(commentEntity1);
        commentEntityList.add(commentEntity);
        PageImpl<CommentEntity> pageImpl = new PageImpl<>(commentEntityList);
        when(commentRepository.findAll((Pageable) any())).thenReturn(pageImpl);

        CommentAdminPanelDTO commentAdminPanelDTO = new CommentAdminPanelDTO();
        commentAdminPanelDTO.setContent("Not all who wander are lost");
        commentAdminPanelDTO.setId(123L);
        commentAdminPanelDTO.setOwnerAvatarUrl("https://example.org/example");
        commentAdminPanelDTO.setOwnerId(123L);
        commentAdminPanelDTO.setTargetRecipeId(123L);
        when(modelMapper.map((Object) any(), (Class<CommentAdminPanelDTO>) any())).thenReturn(commentAdminPanelDTO);
        assertEquals(2, commentService.getAllRecipes(10, 3, "Sort By").toList().size());
        verify(commentRepository).findAll((Pageable) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<CommentAdminPanelDTO>) any());
    }
}

