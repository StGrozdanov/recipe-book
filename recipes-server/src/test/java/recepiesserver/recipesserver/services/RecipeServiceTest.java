package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.events.DeleteUserEvent;
import recepiesserver.recipesserver.events.GlobalSearchEvent;
import recepiesserver.recipesserver.exceptions.imageExceptions.PictureUrlAlreadyExistsException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.NoSuchRecipeCategoryException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeAlreadyApprovedException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeNotFoundException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeWithTheSameNameOrImageAlreadyExistsException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentDetailsDTO;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentModifiedAtDTO;
import recepiesserver.recipesserver.models.dtos.globalSearchDTOs.AdminGlobalSearchDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeAdminPanelDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCategoriesDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCreateDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeDetailsDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeEditDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeFavouritesDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeLandingPageDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserMostActiveDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserSummaryDTO;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.RoleEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.repositories.RecipeRepository;

@ContextConfiguration(classes = {RecipeService.class})
@ExtendWith(SpringExtension.class)
class RecipeServiceTest {
    @MockBean
    private AmazonS3Service amazonS3Service;

    @MockBean
    private CommentService commentService;

    @MockBean
    private ModelMapper modelMapper;

    @MockBean
    private RecipeRepository recipeRepository;

    @Autowired
    private RecipeService recipeService;

    @MockBean
    private UserService userService;

    @Test
    void testGetAllRecipesShouldActAsExpectedUponEmptyCollection() {
        when(recipeRepository.findAll()).thenReturn(new ArrayList<>());
        assertTrue(recipeService.getAllRecipes().isEmpty());
        verify(recipeRepository).findAll();
    }

    @Test
    void testGetAllRecipes() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAll()).thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(1, recipeService.getAllRecipes().size());
        verify(recipeRepository).findAll();
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testGetAllRecipesCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAll()).thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(2, recipeService.getAllRecipes().size());
        verify(recipeRepository).findAll();
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testGetAllRecipesCaseThree() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAll()).thenReturn(recipeEntityList);
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService.getAllRecipes());
        verify(recipeRepository).findAll();
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testGetSingleRecipe() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);

        RecipeDetailsDTO recipeDetailsDTO = new RecipeDetailsDTO();
        recipeDetailsDTO.setCategoryName("Category Name");
        recipeDetailsDTO.setId(123L);
        recipeDetailsDTO.setImageUrl("https://example.org/example");
        recipeDetailsDTO.setOwnerId(123L);
        recipeDetailsDTO.setProducts(new ArrayList<>());
        recipeDetailsDTO.setRecipeName("Recipe Name");
        recipeDetailsDTO.setStatus(PublicationStatusEnum.PENDING);
        recipeDetailsDTO.setSteps(new ArrayList<>());
        when(modelMapper.map((Object) any(), (Class<RecipeDetailsDTO>) any())).thenReturn(recipeDetailsDTO);
        assertSame(recipeDetailsDTO, recipeService.getSingleRecipe(123L));
        verify(recipeRepository).findById((Long) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeDetailsDTO>) any());
    }

    @Test
    void testGetSingleRecipeShouldThrowInCaseOfRecipeWithTheSameNameOrImage() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(modelMapper.map((Object) any(), (Class<RecipeDetailsDTO>) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService.getSingleRecipe(123L));
        verify(recipeRepository).findById((Long) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeDetailsDTO>) any());
    }

    @Test
    void testDeleteRecipe() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        doNothing().when(recipeRepository).deleteById((Long) any());
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(userService.findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any())).thenReturn(new ArrayList<>());
        when(commentService.getAllCommentsForTargetRecipe((Long) any())).thenReturn(new ArrayList<>());
        recipeService.deleteRecipe(123L);
        verify(recipeRepository).findById((Long) any());
        verify(recipeRepository).deleteById((Long) any());
        verify(userService).findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any());
        verify(commentService).getAllCommentsForTargetRecipe((Long) any());
    }

    @Test
    void testDeleteRecipeCaseTwo() {
        doNothing().when(recipeRepository).deleteById((Long) any());
        when(recipeRepository.findById((Long) any())).thenReturn(Optional.empty());
        RecipeEntity recipeEntity = mock(RecipeEntity.class);
        when(recipeEntity.getId()).thenReturn(123L);
        when(recipeEntity.getImageUrl()).thenReturn("https://example.org/example");
        doNothing().when(recipeEntity).setId((Long) any());
        doNothing().when(recipeEntity).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity).setImageUrl((String) any());
        doNothing().when(recipeEntity).setOwnerId((Long) any());
        doNothing().when(recipeEntity).setProducts((List<String>) any());
        doNothing().when(recipeEntity).setRecipeName((String) any());
        doNothing().when(recipeEntity).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity).setSteps((List<String>) any());
        doNothing().when(recipeEntity).setVisitationsCount((Long) any());
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
        when(userService.findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any())).thenReturn(new ArrayList<>());
        when(commentService.getAllCommentsForTargetRecipe((Long) any())).thenReturn(new ArrayList<>());
        assertThrows(RecipeNotFoundException.class, () -> recipeService.deleteRecipe(123L));
        verify(recipeRepository).findById((Long) any());
        verify(recipeEntity).setId((Long) any());
        verify(recipeEntity).setCategory((CategoryEnum) any());
        verify(recipeEntity).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity).setImageUrl((String) any());
        verify(recipeEntity).setOwnerId((Long) any());
        verify(recipeEntity).setProducts((List<String>) any());
        verify(recipeEntity).setRecipeName((String) any());
        verify(recipeEntity).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity).setSteps((List<String>) any());
        verify(recipeEntity).setVisitationsCount((Long) any());
    }

    @Test
    void testDeleteRecipeCaseThree() {
        RecipeEntity recipeEntity = mock(RecipeEntity.class);
        when(recipeEntity.getId()).thenReturn(123L);
        when(recipeEntity.getImageUrl()).thenReturn("https://example.org/example");
        doNothing().when(recipeEntity).setId((Long) any());
        doNothing().when(recipeEntity).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity).setImageUrl((String) any());
        doNothing().when(recipeEntity).setOwnerId((Long) any());
        doNothing().when(recipeEntity).setProducts((List<String>) any());
        doNothing().when(recipeEntity).setRecipeName((String) any());
        doNothing().when(recipeEntity).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity).setSteps((List<String>) any());
        doNothing().when(recipeEntity).setVisitationsCount((Long) any());
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        doNothing().when(recipeRepository).deleteById((Long) any());
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);

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

        ArrayList<UserEntity> userEntityList = new ArrayList<>();
        userEntityList.add(userEntity);
        when(userService.findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any())).thenReturn(userEntityList);
        when(commentService.getAllCommentsForTargetRecipe((Long) any())).thenReturn(new ArrayList<>());
        recipeService.deleteRecipe(123L);
        verify(recipeRepository).findById((Long) any());
        verify(recipeRepository).deleteById((Long) any());
        verify(recipeEntity).getId();
        verify(recipeEntity).getImageUrl();
        verify(recipeEntity).setId((Long) any());
        verify(recipeEntity).setCategory((CategoryEnum) any());
        verify(recipeEntity).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity).setImageUrl((String) any());
        verify(recipeEntity).setOwnerId((Long) any());
        verify(recipeEntity).setProducts((List<String>) any());
        verify(recipeEntity).setRecipeName((String) any());
        verify(recipeEntity).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity).setSteps((List<String>) any());
        verify(recipeEntity).setVisitationsCount((Long) any());
        verify(userService).findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any());
        verify(commentService).getAllCommentsForTargetRecipe((Long) any());
    }

    @Test
    void testDeleteRecipeCaseFour() {
        RecipeEntity recipeEntity = mock(RecipeEntity.class);
        when(recipeEntity.getId()).thenReturn(123L);
        when(recipeEntity.getImageUrl()).thenReturn("https://example.org/example");
        doNothing().when(recipeEntity).setId((Long) any());
        doNothing().when(recipeEntity).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity).setImageUrl((String) any());
        doNothing().when(recipeEntity).setOwnerId((Long) any());
        doNothing().when(recipeEntity).setProducts((List<String>) any());
        doNothing().when(recipeEntity).setRecipeName((String) any());
        doNothing().when(recipeEntity).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity).setSteps((List<String>) any());
        doNothing().when(recipeEntity).setVisitationsCount((Long) any());
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        doNothing().when(recipeRepository).deleteById((Long) any());
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);

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

        ArrayList<UserEntity> userEntityList = new ArrayList<>();
        userEntityList.add(userEntity1);
        userEntityList.add(userEntity);
        when(userService.findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any())).thenReturn(userEntityList);
        when(commentService.getAllCommentsForTargetRecipe((Long) any())).thenReturn(new ArrayList<>());
        recipeService.deleteRecipe(123L);
        verify(recipeRepository).findById((Long) any());
        verify(recipeRepository).deleteById((Long) any());
        verify(recipeEntity).getId();
        verify(recipeEntity).getImageUrl();
        verify(recipeEntity).setId((Long) any());
        verify(recipeEntity).setCategory((CategoryEnum) any());
        verify(recipeEntity).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity).setImageUrl((String) any());
        verify(recipeEntity).setOwnerId((Long) any());
        verify(recipeEntity).setProducts((List<String>) any());
        verify(recipeEntity).setRecipeName((String) any());
        verify(recipeEntity).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity).setSteps((List<String>) any());
        verify(recipeEntity).setVisitationsCount((Long) any());
        verify(userService).findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any());
        verify(commentService).getAllCommentsForTargetRecipe((Long) any());
    }

    @Test
    void testDeleteRecipeCaseFive() {
        RecipeEntity recipeEntity = mock(RecipeEntity.class);
        when(recipeEntity.getId()).thenReturn(123L);
        when(recipeEntity.getImageUrl()).thenReturn("https://example.org/example");
        doNothing().when(recipeEntity).setId((Long) any());
        doNothing().when(recipeEntity).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity).setImageUrl((String) any());
        doNothing().when(recipeEntity).setOwnerId((Long) any());
        doNothing().when(recipeEntity).setProducts((List<String>) any());
        doNothing().when(recipeEntity).setRecipeName((String) any());
        doNothing().when(recipeEntity).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity).setSteps((List<String>) any());
        doNothing().when(recipeEntity).setVisitationsCount((Long) any());
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        doNothing().when(recipeRepository).deleteById((Long) any());
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(userService.findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any())).thenReturn(new ArrayList<>());

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

        ArrayList<CommentDetailsDTO> commentDetailsDTOList = new ArrayList<>();
        commentDetailsDTOList.add(commentDetailsDTO);

        CommentModifiedAtDTO commentModifiedAtDTO = new CommentModifiedAtDTO();
        commentModifiedAtDTO.setModifiedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        when(commentService.deleteComment((Long) any())).thenReturn(commentModifiedAtDTO);
        when(commentService.getAllCommentsForTargetRecipe((Long) any())).thenReturn(commentDetailsDTOList);
        recipeService.deleteRecipe(123L);
        verify(recipeRepository).findById((Long) any());
        verify(recipeRepository).deleteById((Long) any());
        verify(recipeEntity).getId();
        verify(recipeEntity).getImageUrl();
        verify(recipeEntity).setId((Long) any());
        verify(recipeEntity).setCategory((CategoryEnum) any());
        verify(recipeEntity).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity).setImageUrl((String) any());
        verify(recipeEntity).setOwnerId((Long) any());
        verify(recipeEntity).setProducts((List<String>) any());
        verify(recipeEntity).setRecipeName((String) any());
        verify(recipeEntity).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity).setSteps((List<String>) any());
        verify(recipeEntity).setVisitationsCount((Long) any());
        verify(userService).findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any());
        verify(commentService).getAllCommentsForTargetRecipe((Long) any());
        verify(commentService).deleteComment((Long) any());
    }

    @Test
    void testDeleteRecipeCaseSix() {
        RecipeEntity recipeEntity = mock(RecipeEntity.class);
        when(recipeEntity.getId()).thenReturn(123L);
        when(recipeEntity.getImageUrl()).thenReturn("amazonaws");
        doNothing().when(recipeEntity).setId((Long) any());
        doNothing().when(recipeEntity).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity).setImageUrl((String) any());
        doNothing().when(recipeEntity).setOwnerId((Long) any());
        doNothing().when(recipeEntity).setProducts((List<String>) any());
        doNothing().when(recipeEntity).setRecipeName((String) any());
        doNothing().when(recipeEntity).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity).setSteps((List<String>) any());
        doNothing().when(recipeEntity).setVisitationsCount((Long) any());
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        doNothing().when(recipeRepository).deleteById((Long) any());
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(userService.findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any())).thenReturn(new ArrayList<>());

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

        ArrayList<CommentDetailsDTO> commentDetailsDTOList = new ArrayList<>();
        commentDetailsDTOList.add(commentDetailsDTO);

        CommentModifiedAtDTO commentModifiedAtDTO = new CommentModifiedAtDTO();
        commentModifiedAtDTO.setModifiedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        when(commentService.deleteComment((Long) any())).thenReturn(commentModifiedAtDTO);
        when(commentService.getAllCommentsForTargetRecipe((Long) any())).thenReturn(commentDetailsDTOList);
        doNothing().when(amazonS3Service).deleteFile((String) any());
        recipeService.deleteRecipe(123L);
        verify(recipeRepository).findById((Long) any());
        verify(recipeRepository).deleteById((Long) any());
        verify(recipeEntity).getId();
        verify(recipeEntity, atLeast(1)).getImageUrl();
        verify(recipeEntity).setId((Long) any());
        verify(recipeEntity).setCategory((CategoryEnum) any());
        verify(recipeEntity).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity).setImageUrl((String) any());
        verify(recipeEntity).setOwnerId((Long) any());
        verify(recipeEntity).setProducts((List<String>) any());
        verify(recipeEntity).setRecipeName((String) any());
        verify(recipeEntity).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity).setSteps((List<String>) any());
        verify(recipeEntity).setVisitationsCount((Long) any());
        verify(userService).findAllUsersThatAddedRecipeToFavourites((RecipeEntity) any());
        verify(commentService).getAllCommentsForTargetRecipe((Long) any());
        verify(commentService).deleteComment((Long) any());
        verify(amazonS3Service).deleteFile((String) any());
    }

    @Test
    void testGetRecipesByPageEmptyCollection() {
        when(recipeRepository.findAllByStatus((PublicationStatusEnum) any(), (Pageable) any()))
                .thenReturn(new PageImpl<>(new ArrayList<>()));
        assertTrue(recipeService.getRecipesByPage(10, 3, "Sort By").toList().isEmpty());
        verify(recipeRepository).findAllByStatus((PublicationStatusEnum) any(), (Pageable) any());
    }

    @Test
    void testGetRecipesByPage() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        PageImpl<RecipeEntity> pageImpl = new PageImpl<>(recipeEntityList);
        when(recipeRepository.findAllByStatus((PublicationStatusEnum) any(), (Pageable) any())).thenReturn(pageImpl);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(1, recipeService.getRecipesByPage(10, 3, "Sort By").toList().size());
        verify(recipeRepository).findAllByStatus((PublicationStatusEnum) any(), (Pageable) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testGetRecipesByPageCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        PageImpl<RecipeEntity> pageImpl = new PageImpl<>(recipeEntityList);
        when(recipeRepository.findAllByStatus((PublicationStatusEnum) any(), (Pageable) any())).thenReturn(pageImpl);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(2, recipeService.getRecipesByPage(10, 3, "Sort By").toList().size());
        verify(recipeRepository).findAllByStatus((PublicationStatusEnum) any(), (Pageable) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testCreateNewRecipe() throws UnsupportedEncodingException {
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(true);
        when(amazonS3Service.uploadFile((MultipartFile) any())).thenReturn("Upload File");

        RecipeCreateDTO recipeCreateDTO = new RecipeCreateDTO();
        recipeCreateDTO.setCategory("Category");
        recipeCreateDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeCreateDTO.setImageUrl("https://example.org/example");
        recipeCreateDTO.setOwnerId(123L);
        recipeCreateDTO.setProducts(new ArrayList<>());
        recipeCreateDTO.setRecipeName("Recipe Name");
        recipeCreateDTO.setStatus(PublicationStatusEnum.PENDING);
        recipeCreateDTO.setSteps(new ArrayList<>());
        recipeCreateDTO.setVisitationsCount(3L);
        assertThrows(PictureUrlAlreadyExistsException.class, () -> recipeService.createNewRecipe(recipeCreateDTO,
                new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8"))));
        verify(recipeRepository).existsByImageUrl((String) any());
        verify(amazonS3Service).uploadFile((MultipartFile) any());
    }

    @Test
    void testCreateNewRecipeCaseTwo() throws UnsupportedEncodingException {
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(true);
        when(amazonS3Service.uploadFile((MultipartFile) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));

        RecipeCreateDTO recipeCreateDTO = new RecipeCreateDTO();
        recipeCreateDTO.setCategory("Category");
        recipeCreateDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeCreateDTO.setImageUrl("https://example.org/example");
        recipeCreateDTO.setOwnerId(123L);
        recipeCreateDTO.setProducts(new ArrayList<>());
        recipeCreateDTO.setRecipeName("Recipe Name");
        recipeCreateDTO.setStatus(PublicationStatusEnum.PENDING);
        recipeCreateDTO.setSteps(new ArrayList<>());
        recipeCreateDTO.setVisitationsCount(3L);
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService
                .createNewRecipe(recipeCreateDTO, new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8"))));
        verify(amazonS3Service).uploadFile((MultipartFile) any());
    }

    @Test
    void testCreateNewRecipeCaseThree() throws UnsupportedEncodingException {
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
        when(recipeRepository.save((RecipeEntity) any())).thenReturn(recipeEntity);
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(false);
        when(modelMapper.map((Object) any(), (Class<Object>) any())).thenReturn("Map");

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
        when(userService.userIsAdministrator((UserEntity) any()))
                .thenThrow(new RecipeNotFoundException("An error occurred"));
        when(userService.userIsModerator((UserEntity) any())).thenThrow(new RecipeNotFoundException("An error occurred"));
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        when(amazonS3Service.uploadFile((MultipartFile) any())).thenReturn("Upload File");

        RecipeCreateDTO recipeCreateDTO = new RecipeCreateDTO();
        recipeCreateDTO.setCategory("Category");
        recipeCreateDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeCreateDTO.setImageUrl("https://example.org/example");
        recipeCreateDTO.setOwnerId(123L);
        recipeCreateDTO.setProducts(new ArrayList<>());
        recipeCreateDTO.setRecipeName("Recipe Name");
        recipeCreateDTO.setStatus(PublicationStatusEnum.PENDING);
        recipeCreateDTO.setSteps(new ArrayList<>());
        recipeCreateDTO.setVisitationsCount(3L);
        assertThrows(RecipeNotFoundException.class, () -> recipeService.createNewRecipe(recipeCreateDTO,
                new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8"))));
        verify(recipeRepository).existsByImageUrl((String) any());
        verify(userService).userIsAdministrator((UserEntity) any());
        verify(userService).findUserById((Long) any());
        verify(amazonS3Service).uploadFile((MultipartFile) any());
    }

    @Test
    void testCreateNewRecipeCaseFour() throws UnsupportedEncodingException {
        RecipeEntity recipeEntity = mock(RecipeEntity.class);
        doNothing().when(recipeEntity).setId((Long) any());
        doNothing().when(recipeEntity).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity).setImageUrl((String) any());
        doNothing().when(recipeEntity).setOwnerId((Long) any());
        doNothing().when(recipeEntity).setProducts((List<String>) any());
        doNothing().when(recipeEntity).setRecipeName((String) any());
        doNothing().when(recipeEntity).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity).setSteps((List<String>) any());
        doNothing().when(recipeEntity).setVisitationsCount((Long) any());
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
        when(recipeRepository.save((RecipeEntity) any())).thenReturn(recipeEntity);
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(false);
        when(modelMapper.map((Object) any(), (Class<Object>) any())).thenReturn(null);

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
        when(userService.userIsAdministrator((UserEntity) any())).thenReturn(true);
        when(userService.userIsModerator((UserEntity) any())).thenReturn(true);
        when(userService.findUserById((Long) any())).thenReturn(ofResult);
        when(amazonS3Service.uploadFile((MultipartFile) any())).thenReturn("Upload File");

        RecipeCreateDTO recipeCreateDTO = new RecipeCreateDTO();
        recipeCreateDTO.setCategory("Category");
        recipeCreateDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeCreateDTO.setImageUrl("https://example.org/example");
        recipeCreateDTO.setOwnerId(123L);
        recipeCreateDTO.setProducts(new ArrayList<>());
        recipeCreateDTO.setRecipeName("Recipe Name");
        recipeCreateDTO.setStatus(PublicationStatusEnum.PENDING);
        recipeCreateDTO.setSteps(new ArrayList<>());
        recipeCreateDTO.setVisitationsCount(3L);
        assertNull(
                recipeService.createNewRecipe(recipeCreateDTO, new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8"))));
        verify(recipeRepository).existsByImageUrl((String) any());
        verify(recipeRepository).save((RecipeEntity) any());
        verify(recipeEntity).setId((Long) any());
        verify(recipeEntity).setCategory((CategoryEnum) any());
        verify(recipeEntity).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity).setImageUrl((String) any());
        verify(recipeEntity).setOwnerId((Long) any());
        verify(recipeEntity).setProducts((List<String>) any());
        verify(recipeEntity).setRecipeName((String) any());
        verify(recipeEntity).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity).setSteps((List<String>) any());
        verify(recipeEntity).setVisitationsCount((Long) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeEntity>) any());
        verify(userService).userIsAdministrator((UserEntity) any());
        verify(userService).userIsModerator((UserEntity) any());
        verify(userService).findUserById((Long) any());
        verify(amazonS3Service).uploadFile((MultipartFile) any());
        assertEquals(PublicationStatusEnum.APPROVED, recipeCreateDTO.getStatus());
        assertEquals("Upload File", recipeCreateDTO.getImageUrl());
    }

    @Test
    void testCreateNewRecipeCaseFive() throws UnsupportedEncodingException {
        RecipeEntity recipeEntity = mock(RecipeEntity.class);
        doNothing().when(recipeEntity).setId((Long) any());
        doNothing().when(recipeEntity).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity).setImageUrl((String) any());
        doNothing().when(recipeEntity).setOwnerId((Long) any());
        doNothing().when(recipeEntity).setProducts((List<String>) any());
        doNothing().when(recipeEntity).setRecipeName((String) any());
        doNothing().when(recipeEntity).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity).setSteps((List<String>) any());
        doNothing().when(recipeEntity).setVisitationsCount((Long) any());
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
        when(recipeRepository.save((RecipeEntity) any())).thenReturn(recipeEntity);
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(false);
        when(modelMapper.map((Object) any(), (Class<Object>) any())).thenReturn("Map");
        when(userService.userIsAdministrator((UserEntity) any())).thenReturn(true);
        when(userService.userIsModerator((UserEntity) any())).thenReturn(true);
        when(userService.findUserById((Long) any())).thenReturn(Optional.empty());
        UserEntity userEntity = mock(UserEntity.class);
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        when(amazonS3Service.uploadFile((MultipartFile) any())).thenReturn("Upload File");

        RecipeCreateDTO recipeCreateDTO = new RecipeCreateDTO();
        recipeCreateDTO.setCategory("Category");
        recipeCreateDTO.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeCreateDTO.setImageUrl("https://example.org/example");
        recipeCreateDTO.setOwnerId(123L);
        recipeCreateDTO.setProducts(new ArrayList<>());
        recipeCreateDTO.setRecipeName("Recipe Name");
        recipeCreateDTO.setStatus(PublicationStatusEnum.PENDING);
        recipeCreateDTO.setSteps(new ArrayList<>());
        recipeCreateDTO.setVisitationsCount(3L);
        assertThrows(UserNotFoundException.class, () -> recipeService.createNewRecipe(recipeCreateDTO,
                new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8"))));
        verify(recipeRepository).existsByImageUrl((String) any());
        verify(recipeEntity).setId((Long) any());
        verify(recipeEntity).setCategory((CategoryEnum) any());
        verify(recipeEntity).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity).setImageUrl((String) any());
        verify(recipeEntity).setOwnerId((Long) any());
        verify(recipeEntity).setProducts((List<String>) any());
        verify(recipeEntity).setRecipeName((String) any());
        verify(recipeEntity).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity).setSteps((List<String>) any());
        verify(recipeEntity).setVisitationsCount((Long) any());
        verify(userService).findUserById((Long) any());
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
        verify(amazonS3Service).uploadFile((MultipartFile) any());
    }

    @Test
    void testFindRecipeById() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        Optional<RecipeEntity> actualFindRecipeByIdResult = recipeService.findRecipeById(123L);
        assertSame(ofResult, actualFindRecipeByIdResult);
        assertTrue(actualFindRecipeByIdResult.isPresent());
        verify(recipeRepository).findById((Long) any());
    }

    void testFindRecipeByIdShouldThrow() {
        when(recipeRepository.findById((Long) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService.findRecipeById(123L));
        verify(recipeRepository).findById((Long) any());
    }

    @Test
    void testEditRecipeShouldThrowIfPictureAlreadyExists() throws UnsupportedEncodingException {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(true);
        when(recipeRepository.existsByImageUrlAndImageUrlNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.existsByRecipeNameAndRecipeNameNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(amazonS3Service.uploadFile((MultipartFile) any())).thenReturn("Upload File");

        RecipeEditDTO recipeEditDTO = new RecipeEditDTO();
        recipeEditDTO.setCategory("Category");
        recipeEditDTO.setImageUrl("https://example.org/example");
        recipeEditDTO.setProducts(new ArrayList<>());
        recipeEditDTO.setRecipeName("Recipe Name");
        recipeEditDTO.setSteps(new ArrayList<>());
        assertThrows(PictureUrlAlreadyExistsException.class, () -> recipeService.editRecipe(recipeEditDTO,
                new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8")), 123L));
        verify(recipeRepository).existsByImageUrl((String) any());
        verify(recipeRepository).findById((Long) any());
        verify(amazonS3Service).uploadFile((MultipartFile) any());
    }

    @Test
    void testEditRecipeShouldThrowIfRecipeWithTheSameNameExists() throws UnsupportedEncodingException {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(true);
        when(recipeRepository.existsByImageUrlAndImageUrlNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.existsByRecipeNameAndRecipeNameNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(amazonS3Service.uploadFile((MultipartFile) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));

        RecipeEditDTO recipeEditDTO = new RecipeEditDTO();
        recipeEditDTO.setCategory("Category");
        recipeEditDTO.setImageUrl("https://example.org/example");
        recipeEditDTO.setProducts(new ArrayList<>());
        recipeEditDTO.setRecipeName("Recipe Name");
        recipeEditDTO.setSteps(new ArrayList<>());
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService.editRecipe(recipeEditDTO,
                new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8")), 123L));
        verify(recipeRepository).findById((Long) any());
        verify(amazonS3Service).uploadFile((MultipartFile) any());
    }

    @Test
    void testEditRecipeShouldThrowIfRecipeWithSameImageAndNameExists() throws UnsupportedEncodingException {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(false);
        when(recipeRepository.existsByImageUrlAndImageUrlNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.existsByRecipeNameAndRecipeNameNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(amazonS3Service.uploadFile((MultipartFile) any())).thenReturn("Upload File");

        RecipeEditDTO recipeEditDTO = new RecipeEditDTO();
        recipeEditDTO.setCategory("Category");
        recipeEditDTO.setImageUrl("https://example.org/example");
        recipeEditDTO.setProducts(new ArrayList<>());
        recipeEditDTO.setRecipeName("Recipe Name");
        recipeEditDTO.setSteps(new ArrayList<>());
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService.editRecipe(recipeEditDTO,
                new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8")), 123L));
        verify(recipeRepository).existsByImageUrl((String) any());
        verify(recipeRepository).existsByImageUrlAndImageUrlNot((String) any(), (String) any());
        verify(recipeRepository).existsByRecipeNameAndRecipeNameNot((String) any(), (String) any());
        verify(recipeRepository).findById((Long) any());
        verify(amazonS3Service).uploadFile((MultipartFile) any());
    }

    @Test
    void testEditRecipeShouldThrowInCaseOfNonExistentRecipe() throws UnsupportedEncodingException {
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(true);
        when(recipeRepository.existsByImageUrlAndImageUrlNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.existsByRecipeNameAndRecipeNameNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.findById((Long) any())).thenReturn(Optional.empty());
        when(amazonS3Service.uploadFile((MultipartFile) any())).thenReturn("Upload File");

        RecipeEditDTO recipeEditDTO = new RecipeEditDTO();
        recipeEditDTO.setCategory("Category");
        recipeEditDTO.setImageUrl("https://example.org/example");
        recipeEditDTO.setProducts(new ArrayList<>());
        recipeEditDTO.setRecipeName("Recipe Name");
        recipeEditDTO.setSteps(new ArrayList<>());
        assertThrows(RecipeNotFoundException.class, () -> recipeService.editRecipe(recipeEditDTO,
                new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8")), 123L));
        verify(recipeRepository).findById((Long) any());
    }

    @Test
    void testEditRecipeShouldThrowInCaseOfExistingImageUrl() throws UnsupportedEncodingException {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.existsByImageUrl((String) any())).thenReturn(true);
        when(recipeRepository.existsByImageUrlAndImageUrlNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.existsByRecipeNameAndRecipeNameNot((String) any(), (String) any())).thenReturn(true);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(amazonS3Service.uploadFile((MultipartFile) any())).thenReturn("Upload File");
        RecipeEditDTO recipeEditDTO = mock(RecipeEditDTO.class);
        when(recipeEditDTO.getImageUrl()).thenReturn("");
        doNothing().when(recipeEditDTO).setCategory((String) any());
        doNothing().when(recipeEditDTO).setImageUrl((String) any());
        doNothing().when(recipeEditDTO).setProducts((List<String>) any());
        doNothing().when(recipeEditDTO).setRecipeName((String) any());
        doNothing().when(recipeEditDTO).setSteps((List<String>) any());
        recipeEditDTO.setCategory("Category");
        recipeEditDTO.setImageUrl("https://example.org/example");
        recipeEditDTO.setProducts(new ArrayList<>());
        recipeEditDTO.setRecipeName("Recipe Name");
        recipeEditDTO.setSteps(new ArrayList<>());
        assertThrows(PictureUrlAlreadyExistsException.class, () -> recipeService.editRecipe(recipeEditDTO,
                new MockMultipartFile("Name", "AAAAAAAA".getBytes("UTF-8")), 123L));
        verify(recipeRepository).existsByImageUrl((String) any());
        verify(recipeRepository).findById((Long) any());
        verify(amazonS3Service).uploadFile((MultipartFile) any());
        verify(recipeEditDTO, atLeast(1)).getImageUrl();
        verify(recipeEditDTO).setCategory((String) any());
        verify(recipeEditDTO).setImageUrl((String) any());
        verify(recipeEditDTO).setProducts((List<String>) any());
        verify(recipeEditDTO).setRecipeName((String) any());
        verify(recipeEditDTO).setSteps((List<String>) any());
    }

    @Test
    void testFindRecipesByUserEmptyCollection() {
        when(recipeRepository.findAllByOwnerId((Long) any())).thenReturn(new ArrayList<>());
        assertTrue(recipeService.findRecipesByUser(123L).isEmpty());
        verify(recipeRepository).findAllByOwnerId((Long) any());
    }

    @Test
    void testFindRecipesByUser() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByOwnerId((Long) any())).thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(1, recipeService.findRecipesByUser(123L).size());
        verify(recipeRepository).findAllByOwnerId((Long) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindRecipesByUserCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByOwnerId((Long) any())).thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(2, recipeService.findRecipesByUser(123L).size());
        verify(recipeRepository).findAllByOwnerId((Long) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindRecipesByUserCaseThree() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByOwnerId((Long) any())).thenReturn(recipeEntityList);
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService.findRecipesByUser(123L));
        verify(recipeRepository).findAllByOwnerId((Long) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testGetUserRecipesCount() {
        when(recipeRepository.countByOwnerId((Long) any())).thenReturn(3);
        assertEquals(3, recipeService.getUserRecipesCount(123L).getRecipesCount().intValue());
        verify(recipeRepository).countByOwnerId((Long) any());
    }

    @Test
    void testGetUserRecipesCountShouldThrow() {
        when(recipeRepository.countByOwnerId((Long) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.getUserRecipesCount(123L));
        verify(recipeRepository).countByOwnerId((Long) any());
    }

    @Test
    void testGetTheLatestThreeRecipesCaseEmpty() {
        when(recipeRepository.findTop3ByStatusNotOrderByCreatedAtDesc((PublicationStatusEnum) any()))
                .thenReturn(new ArrayList<>());
        assertTrue(recipeService.getTheLatestThreeRecipes().isEmpty());
        verify(recipeRepository).findTop3ByStatusNotOrderByCreatedAtDesc((PublicationStatusEnum) any());
    }

    @Test
    void testGetTheLatestThreeRecipes() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findTop3ByStatusNotOrderByCreatedAtDesc((PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);

        RecipeLandingPageDTO recipeLandingPageDTO = new RecipeLandingPageDTO();
        recipeLandingPageDTO.setCategory("Category");
        recipeLandingPageDTO.setId(123L);
        recipeLandingPageDTO.setImageUrl("https://example.org/example");
        recipeLandingPageDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeLandingPageDTO>) any())).thenReturn(recipeLandingPageDTO);
        assertEquals(1, recipeService.getTheLatestThreeRecipes().size());
        verify(recipeRepository).findTop3ByStatusNotOrderByCreatedAtDesc((PublicationStatusEnum) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeLandingPageDTO>) any());
    }

    @Test
    void testGetTheLatestThreeRecipesCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findTop3ByStatusNotOrderByCreatedAtDesc((PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);

        RecipeLandingPageDTO recipeLandingPageDTO = new RecipeLandingPageDTO();
        recipeLandingPageDTO.setCategory("Category");
        recipeLandingPageDTO.setId(123L);
        recipeLandingPageDTO.setImageUrl("https://example.org/example");
        recipeLandingPageDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeLandingPageDTO>) any())).thenReturn(recipeLandingPageDTO);
        assertEquals(2, recipeService.getTheLatestThreeRecipes().size());
        verify(recipeRepository).findTop3ByStatusNotOrderByCreatedAtDesc((PublicationStatusEnum) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeLandingPageDTO>) any());
    }

    @Test
    void testGetTheLatestThreeRecipesShouldThrow() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findTop3ByStatusNotOrderByCreatedAtDesc((PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);
        when(modelMapper.map((Object) any(), (Class<RecipeLandingPageDTO>) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.getTheLatestThreeRecipes());
        verify(recipeRepository).findTop3ByStatusNotOrderByCreatedAtDesc((PublicationStatusEnum) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeLandingPageDTO>) any());
    }

    @Test
    void testGetTheThreeMostViewedRecipesCaseEmpty() {
        when(recipeRepository.findTop3ByStatusNotOrderByVisitationsCountDesc((PublicationStatusEnum) any()))
                .thenReturn(new ArrayList<>());
        assertTrue(recipeService.getTheThreeMostViewedRecipes().isEmpty());
        verify(recipeRepository).findTop3ByStatusNotOrderByVisitationsCountDesc((PublicationStatusEnum) any());
    }

    @Test
    void testGetTheThreeMostViewedRecipes() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findTop3ByStatusNotOrderByVisitationsCountDesc((PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(1, recipeService.getTheThreeMostViewedRecipes().size());
        verify(recipeRepository).findTop3ByStatusNotOrderByVisitationsCountDesc((PublicationStatusEnum) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testGetTheThreeMostViewedRecipesCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findTop3ByStatusNotOrderByVisitationsCountDesc((PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(2, recipeService.getTheThreeMostViewedRecipes().size());
        verify(recipeRepository).findTop3ByStatusNotOrderByVisitationsCountDesc((PublicationStatusEnum) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testGetTheThreeMostViewedRecipesShouldThrow() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findTop3ByStatusNotOrderByVisitationsCountDesc((PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.getTheThreeMostViewedRecipes());
        verify(recipeRepository).findTop3ByStatusNotOrderByVisitationsCountDesc((PublicationStatusEnum) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testIncrementRecipeVisitations() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);

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
        when(recipeRepository.save((RecipeEntity) any())).thenReturn(recipeEntity1);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        assertEquals(4L, recipeService.incrementRecipeVisitations(123L).getVisitationsCount().longValue());
        verify(recipeRepository).save((RecipeEntity) any());
        verify(recipeRepository).findById((Long) any());
    }

    @Test
    void testIncrementRecipeVisitationsShouldThrow() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.save((RecipeEntity) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.incrementRecipeVisitations(123L));
        verify(recipeRepository).save((RecipeEntity) any());
        verify(recipeRepository).findById((Long) any());
    }

    @Test
    void testIncrementRecipeVisitationsShouldThrowCaseTwo() {
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
        when(recipeRepository.save((RecipeEntity) any())).thenReturn(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(Optional.empty());
        assertThrows(RecipeNotFoundException.class, () -> recipeService.incrementRecipeVisitations(123L));
        verify(recipeRepository).findById((Long) any());
    }

    @Test
    void testAddRecipeToUserFavourites() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);

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
        Optional<UserEntity> ofResult1 = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult1);

        RecipeFavouritesDTO recipeFavouritesDTO = new RecipeFavouritesDTO();
        recipeFavouritesDTO.setRecipeId(123L);
        recipeFavouritesDTO.setUserId(123L);
        recipeService.addRecipeToUserFavourites(recipeFavouritesDTO);
        verify(recipeRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testAddRecipeToUserFavouritesShouldThrow() {
        when(recipeRepository.findById((Long) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));

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

        RecipeFavouritesDTO recipeFavouritesDTO = new RecipeFavouritesDTO();
        recipeFavouritesDTO.setRecipeId(123L);
        recipeFavouritesDTO.setUserId(123L);
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.addRecipeToUserFavourites(recipeFavouritesDTO));
        verify(recipeRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testAddRecipeToUserFavouritesShouldThrowCaseTwo() {
        when(recipeRepository.findById((Long) any())).thenReturn(Optional.empty());

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

        RecipeFavouritesDTO recipeFavouritesDTO = new RecipeFavouritesDTO();
        recipeFavouritesDTO.setRecipeId(123L);
        recipeFavouritesDTO.setUserId(123L);
        assertThrows(RecipeNotFoundException.class, () -> recipeService.addRecipeToUserFavourites(recipeFavouritesDTO));
        verify(recipeRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testAddRecipeToUserFavouritesCaseTwo() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        UserEntity userEntity = mock(UserEntity.class);
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).addRecipeToFavourites((RecipeEntity) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        Optional<UserEntity> ofResult1 = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult1);

        RecipeFavouritesDTO recipeFavouritesDTO = new RecipeFavouritesDTO();
        recipeFavouritesDTO.setRecipeId(123L);
        recipeFavouritesDTO.setUserId(123L);
        recipeService.addRecipeToUserFavourites(recipeFavouritesDTO);
        verify(recipeRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
        verify(userEntity).setId((Long) any());
        verify(userEntity).addRecipeToFavourites((RecipeEntity) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testAddRecipeToUserFavouritesCaseThree() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(userService.findUserById((Long) any())).thenReturn(Optional.empty());
        UserEntity userEntity = mock(UserEntity.class);
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).addRecipeToFavourites((RecipeEntity) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");

        RecipeFavouritesDTO recipeFavouritesDTO = new RecipeFavouritesDTO();
        recipeFavouritesDTO.setRecipeId(123L);
        recipeFavouritesDTO.setUserId(123L);
        assertThrows(UserNotFoundException.class, () -> recipeService.addRecipeToUserFavourites(recipeFavouritesDTO));
        verify(userService).findUserById((Long) any());
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testFindRecipesByName() {
        when(recipeRepository.findAllByRecipeNameContainingAndStatusNot((String) any(), (PublicationStatusEnum) any()))
                .thenReturn(new ArrayList<>());
        assertTrue(recipeService.findRecipesByName("Name").isEmpty());
        verify(recipeRepository).findAllByRecipeNameContainingAndStatusNot((String) any(), (PublicationStatusEnum) any());
    }

    @Test
    void testFindRecipesByNameCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByRecipeNameContainingAndStatusNot((String) any(), (PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(1, recipeService.findRecipesByName("Name").size());
        verify(recipeRepository).findAllByRecipeNameContainingAndStatusNot((String) any(), (PublicationStatusEnum) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindRecipesByNameCaseThree() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByRecipeNameContainingAndStatusNot((String) any(), (PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(2, recipeService.findRecipesByName("Name").size());
        verify(recipeRepository).findAllByRecipeNameContainingAndStatusNot((String) any(), (PublicationStatusEnum) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindRecipesByNameShouldThrow() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByRecipeNameContainingAndStatusNot((String) any(), (PublicationStatusEnum) any()))
                .thenReturn(recipeEntityList);
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.findRecipesByName("Name"));
        verify(recipeRepository).findAllByRecipeNameContainingAndStatusNot((String) any(), (PublicationStatusEnum) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindUserOwnedRecipesByName() {
        when(recipeRepository.findAllByOwnerIdAndRecipeNameContaining((Long) any(), (String) any()))
                .thenReturn(new ArrayList<>());
        assertTrue(recipeService.findUserOwnedRecipesByName("Name", 123L).isEmpty());
        verify(recipeRepository).findAllByOwnerIdAndRecipeNameContaining((Long) any(), (String) any());
    }

    @Test
    void testFindUserOwnedRecipesByNameCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByOwnerIdAndRecipeNameContaining((Long) any(), (String) any()))
                .thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(1, recipeService.findUserOwnedRecipesByName("Name", 123L).size());
        verify(recipeRepository).findAllByOwnerIdAndRecipeNameContaining((Long) any(), (String) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindUserOwnedRecipesByNameCaseThree() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByOwnerIdAndRecipeNameContaining((Long) any(), (String) any()))
                .thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);
        assertEquals(2, recipeService.findUserOwnedRecipesByName("Name", 123L).size());
        verify(recipeRepository).findAllByOwnerIdAndRecipeNameContaining((Long) any(), (String) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindUserOwnedRecipesByNameShouldThrow() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByOwnerIdAndRecipeNameContaining((Long) any(), (String) any()))
                .thenReturn(recipeEntityList);
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.findUserOwnedRecipesByName("Name", 123L));
        verify(recipeRepository).findAllByOwnerIdAndRecipeNameContaining((Long) any(), (String) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindRecipesByCategories() {
        when(recipeRepository.findAllByCategoryInAndStatusNot((Collection<CategoryEnum>) any(),
                (PublicationStatusEnum) any())).thenReturn(new ArrayList<>());

        RecipeCategoriesDTO recipeCategoriesDTO = new RecipeCategoriesDTO();
        recipeCategoriesDTO.setCategories(new ArrayList<>());
        assertTrue(recipeService.findRecipesByCategories(recipeCategoriesDTO).isEmpty());
        verify(recipeRepository).findAllByCategoryInAndStatusNot((Collection<CategoryEnum>) any(),
                (PublicationStatusEnum) any());
    }

    @Test
    void testFindRecipesByCategoriesCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByCategoryInAndStatusNot((Collection<CategoryEnum>) any(),
                (PublicationStatusEnum) any())).thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);

        RecipeCategoriesDTO recipeCategoriesDTO = new RecipeCategoriesDTO();
        recipeCategoriesDTO.setCategories(new ArrayList<>());
        assertEquals(1, recipeService.findRecipesByCategories(recipeCategoriesDTO).size());
        verify(recipeRepository).findAllByCategoryInAndStatusNot((Collection<CategoryEnum>) any(),
                (PublicationStatusEnum) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testFindRecipesByCategoriesCaseThree() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByCategoryInAndStatusNot((Collection<CategoryEnum>) any(),
                (PublicationStatusEnum) any())).thenReturn(recipeEntityList);

        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(123L);
        recipeCatalogueDTO.setImageUrl("https://example.org/example");
        recipeCatalogueDTO.setRecipeName("Recipe Name");
        when(modelMapper.map((Object) any(), (Class<RecipeCatalogueDTO>) any())).thenReturn(recipeCatalogueDTO);

        RecipeCategoriesDTO recipeCategoriesDTO = new RecipeCategoriesDTO();
        recipeCategoriesDTO.setCategories(new ArrayList<>());
        assertEquals(2, recipeService.findRecipesByCategories(recipeCategoriesDTO).size());
        verify(recipeRepository).findAllByCategoryInAndStatusNot((Collection<CategoryEnum>) any(),
                (PublicationStatusEnum) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeCatalogueDTO>) any());
    }

    @Test
    void testGetTotalRecipesCount() {
        when(recipeRepository.count()).thenReturn(3L);
        assertEquals(3, recipeService.getTotalRecipesCount().getRecipesCount().intValue());
        verify(recipeRepository).count();
    }

    @Test
    void testGetTotalRecipesCountShouldThrow() {
        when(recipeRepository.count())
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService.getTotalRecipesCount());
        verify(recipeRepository).count();
    }

    @Test
    void testFindTheMostActiveUser() {
        when(recipeRepository.countByOwnerId((Long) any())).thenReturn(3);
        when(recipeRepository.findMostActiveUser()).thenReturn(1L);

        UserMostActiveDTO userMostActiveDTO = new UserMostActiveDTO();
        userMostActiveDTO.setAvatarUrl("https://example.org/example");
        userMostActiveDTO.setCommentsCount(3);
        userMostActiveDTO.setRecipesCount(3);
        userMostActiveDTO.setTotalPublicationsCount(3);
        userMostActiveDTO.setUsername("janedoe");
        when(modelMapper.map((Object) any(), (Class<UserMostActiveDTO>) any())).thenReturn(userMostActiveDTO);

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
        when(commentService.getUserCommentCount((Long) any())).thenReturn(3);
        UserMostActiveDTO actualFindTheMostActiveUserResult = recipeService.findTheMostActiveUser();
        assertSame(userMostActiveDTO, actualFindTheMostActiveUserResult);
        assertEquals(6, actualFindTheMostActiveUserResult.getTotalPublicationsCount().intValue());
        assertEquals(3, actualFindTheMostActiveUserResult.getRecipesCount().intValue());
        assertEquals(3, actualFindTheMostActiveUserResult.getCommentsCount().intValue());
        verify(recipeRepository).countByOwnerId((Long) any());
        verify(recipeRepository).findMostActiveUser();
        verify(modelMapper).map((Object) any(), (Class<UserMostActiveDTO>) any());
        verify(userService).findUserById((Long) any());
        verify(commentService).getUserCommentCount((Long) any());
    }

    @Test
    void testGetAllAdminPanelRecipes() {
        when(recipeRepository.findAll((Pageable) any())).thenReturn(new PageImpl<>(new ArrayList<>()));
        assertTrue(recipeService.getAllAdminPanelRecipes(10, 3, "Sort By").toList().isEmpty());
        verify(recipeRepository).findAll((Pageable) any());
    }

    @Test
    void testGetAllAdminPanelRecipesCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        PageImpl<RecipeEntity> pageImpl = new PageImpl<>(recipeEntityList);
        when(recipeRepository.findAll((Pageable) any())).thenReturn(pageImpl);

        RecipeAdminPanelDTO recipeAdminPanelDTO = new RecipeAdminPanelDTO();
        recipeAdminPanelDTO.setId(123L);
        recipeAdminPanelDTO.setImageUrl("https://example.org/example");
        recipeAdminPanelDTO.setOwnerId(123L);
        recipeAdminPanelDTO.setRecipeName("Recipe Name");
        recipeAdminPanelDTO.setStatusName("Status Name");
        when(modelMapper.map((Object) any(), (Class<RecipeAdminPanelDTO>) any())).thenReturn(recipeAdminPanelDTO);
        assertEquals(1, recipeService.getAllAdminPanelRecipes(10, 3, "Sort By").toList().size());
        verify(recipeRepository).findAll((Pageable) any());
        verify(modelMapper).map((Object) any(), (Class<RecipeAdminPanelDTO>) any());
    }

    @Test
    void testGetAllAdminPanelRecipesCaseThree() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        PageImpl<RecipeEntity> pageImpl = new PageImpl<>(recipeEntityList);
        when(recipeRepository.findAll((Pageable) any())).thenReturn(pageImpl);

        RecipeAdminPanelDTO recipeAdminPanelDTO = new RecipeAdminPanelDTO();
        recipeAdminPanelDTO.setId(123L);
        recipeAdminPanelDTO.setImageUrl("https://example.org/example");
        recipeAdminPanelDTO.setOwnerId(123L);
        recipeAdminPanelDTO.setRecipeName("Recipe Name");
        recipeAdminPanelDTO.setStatusName("Status Name");
        when(modelMapper.map((Object) any(), (Class<RecipeAdminPanelDTO>) any())).thenReturn(recipeAdminPanelDTO);
        assertEquals(2, recipeService.getAllAdminPanelRecipes(10, 3, "Sort By").toList().size());
        verify(recipeRepository).findAll((Pageable) any());
        verify(modelMapper, atLeast(1)).map((Object) any(), (Class<RecipeAdminPanelDTO>) any());
    }

    @Test
    void testApproveRecipe() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);

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
        when(recipeRepository.save((RecipeEntity) any())).thenReturn(recipeEntity1);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        recipeService.approveRecipe(123L);
        verify(recipeRepository).save((RecipeEntity) any());
        verify(recipeRepository).findById((Long) any());
    }

    @Test
    void testApproveRecipeShouldThrow() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.save((RecipeEntity) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class, () -> recipeService.approveRecipe(123L));
        verify(recipeRepository).save((RecipeEntity) any());
        verify(recipeRepository).findById((Long) any());
    }

    @Test
    void testApproveRecipeShouldThrowCaseTwo() {
        RecipeEntity recipeEntity = mock(RecipeEntity.class);
        when(recipeEntity.getStatus()).thenReturn(PublicationStatusEnum.APPROVED);
        doNothing().when(recipeEntity).setId((Long) any());
        doNothing().when(recipeEntity).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity).setImageUrl((String) any());
        doNothing().when(recipeEntity).setOwnerId((Long) any());
        doNothing().when(recipeEntity).setProducts((List<String>) any());
        doNothing().when(recipeEntity).setRecipeName((String) any());
        doNothing().when(recipeEntity).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity).setSteps((List<String>) any());
        doNothing().when(recipeEntity).setVisitationsCount((Long) any());
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);

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
        when(recipeRepository.save((RecipeEntity) any())).thenReturn(recipeEntity1);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        assertThrows(RecipeAlreadyApprovedException.class, () -> recipeService.approveRecipe(123L));
        verify(recipeRepository).findById((Long) any());
        verify(recipeEntity).getStatus();
        verify(recipeEntity).setId((Long) any());
        verify(recipeEntity).setCategory((CategoryEnum) any());
        verify(recipeEntity).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity).setImageUrl((String) any());
        verify(recipeEntity).setOwnerId((Long) any());
        verify(recipeEntity).setProducts((List<String>) any());
        verify(recipeEntity).setRecipeName((String) any());
        verify(recipeEntity).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity).setSteps((List<String>) any());
        verify(recipeEntity).setVisitationsCount((Long) any());
    }

    @Test
    void testApproveRecipeShouldThrowCaeThree() {
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
        when(recipeRepository.save((RecipeEntity) any())).thenReturn(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(Optional.empty());
        RecipeEntity recipeEntity1 = mock(RecipeEntity.class);
        when(recipeEntity1.getStatus()).thenReturn(PublicationStatusEnum.PENDING);
        doNothing().when(recipeEntity1).setId((Long) any());
        doNothing().when(recipeEntity1).setCategory((CategoryEnum) any());
        doNothing().when(recipeEntity1).setCreatedAt((LocalDateTime) any());
        doNothing().when(recipeEntity1).setImageUrl((String) any());
        doNothing().when(recipeEntity1).setOwnerId((Long) any());
        doNothing().when(recipeEntity1).setProducts((List<String>) any());
        doNothing().when(recipeEntity1).setRecipeName((String) any());
        doNothing().when(recipeEntity1).setStatus((PublicationStatusEnum) any());
        doNothing().when(recipeEntity1).setSteps((List<String>) any());
        doNothing().when(recipeEntity1).setVisitationsCount((Long) any());
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
        assertThrows(RecipeNotFoundException.class, () -> recipeService.approveRecipe(123L));
        verify(recipeRepository).findById((Long) any());
        verify(recipeEntity1).setId((Long) any());
        verify(recipeEntity1).setCategory((CategoryEnum) any());
        verify(recipeEntity1).setCreatedAt((LocalDateTime) any());
        verify(recipeEntity1).setImageUrl((String) any());
        verify(recipeEntity1).setOwnerId((Long) any());
        verify(recipeEntity1).setProducts((List<String>) any());
        verify(recipeEntity1).setRecipeName((String) any());
        verify(recipeEntity1).setStatus((PublicationStatusEnum) any());
        verify(recipeEntity1).setSteps((List<String>) any());
        verify(recipeEntity1).setVisitationsCount((Long) any());
    }

    @Test
    void testGetRecipeOwnerUsername() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);

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
        Optional<UserEntity> ofResult1 = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult1);
        assertEquals("janedoe", recipeService.getRecipeOwnerUsername(123L));
        verify(recipeRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testGetRecipeOwnerUsernameShouldThrow() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(userService.findUserById((Long) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.getRecipeOwnerUsername(123L));
        verify(recipeRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testGetRecipeOwnerUsernameShouldThrowCaseTwo() {
        when(recipeRepository.findById((Long) any())).thenReturn(Optional.empty());

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
        assertThrows(RecipeNotFoundException.class, () -> recipeService.getRecipeOwnerUsername(123L));
        verify(recipeRepository).findById((Long) any());
    }

    @Test
    void testGetRecipeOwnerUsernameCaseTwo() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getUsername()).thenReturn("janedoe");
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        Optional<UserEntity> ofResult1 = Optional.of(userEntity);
        when(userService.findUserById((Long) any())).thenReturn(ofResult1);
        assertEquals("janedoe", recipeService.getRecipeOwnerUsername(123L));
        verify(recipeRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
        verify(userEntity).getUsername();
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testGetRecipeOwnerUsernameCaseThree() {
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
        Optional<RecipeEntity> ofResult = Optional.of(recipeEntity);
        when(recipeRepository.findById((Long) any())).thenReturn(ofResult);
        when(userService.findUserById((Long) any())).thenReturn(Optional.empty());
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getUsername()).thenReturn("janedoe");
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        assertThrows(UserNotFoundException.class, () -> recipeService.getRecipeOwnerUsername(123L));
        verify(recipeRepository).findById((Long) any());
        verify(userService).findUserById((Long) any());
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testGetOwnerUsername() {
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
        assertEquals("janedoe", recipeService.getOwnerUsername(123L));
        verify(userService).findUserById((Long) any());
    }

    @Test
    void testGetOwnerUsernameCaseTwo() {
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getUsername()).thenReturn("janedoe");
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
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
        assertEquals("janedoe", recipeService.getOwnerUsername(123L));
        verify(userService).findUserById((Long) any());
        verify(userEntity).getUsername();
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testGetOwnerUsernameShouldThrow() {
        when(userService.findUserById((Long) any())).thenReturn(Optional.empty());
        UserEntity userEntity = mock(UserEntity.class);
        when(userEntity.getUsername()).thenReturn("janedoe");
        doNothing().when(userEntity).setId((Long) any());
        doNothing().when(userEntity).setAvatarUrl((String) any());
        doNothing().when(userEntity).setBlocked((Boolean) any());
        doNothing().when(userEntity).setEmail((String) any());
        doNothing().when(userEntity).setFavourites((List<RecipeEntity>) any());
        doNothing().when(userEntity).setIpAddresses((Set<String>) any());
        doNothing().when(userEntity).setPassword((String) any());
        doNothing().when(userEntity).setRoles((List<RoleEntity>) any());
        doNothing().when(userEntity).setUsername((String) any());
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        assertThrows(UserNotFoundException.class, () -> recipeService.getOwnerUsername(123L));
        verify(userService).findUserById((Long) any());
        verify(userEntity).setId((Long) any());
        verify(userEntity).setAvatarUrl((String) any());
        verify(userEntity).setBlocked((Boolean) any());
        verify(userEntity).setEmail((String) any());
        verify(userEntity).setFavourites((List<RecipeEntity>) any());
        verify(userEntity).setIpAddresses((Set<String>) any());
        verify(userEntity).setPassword((String) any());
        verify(userEntity).setRoles((List<RoleEntity>) any());
        verify(userEntity).setUsername((String) any());
    }

    @Test
    void testOtherRecipeWithTheSameImageExistsIfTheImageExists() {
        when(recipeRepository.existsByImageUrlAndImageUrlNot((String) any(), (String) any())).thenReturn(true);
        assertTrue(recipeService.otherRecipeWithTheSameImageExists("Image", "Original Image"));
        verify(recipeRepository).existsByImageUrlAndImageUrlNot((String) any(), (String) any());
    }

    @Test
    void testOtherRecipeWithTheSameImageExistsIfTheImageDoesNotExist() {
        when(recipeRepository.existsByImageUrlAndImageUrlNot((String) any(), (String) any())).thenReturn(false);
        assertFalse(recipeService.otherRecipeWithTheSameImageExists("Image", "Original Image"));
        verify(recipeRepository).existsByImageUrlAndImageUrlNot((String) any(), (String) any());
    }

    @Test
    void testOtherRecipeWithTheSameImageExistsShouldThrow() {
        when(recipeRepository.existsByImageUrlAndImageUrlNot((String) any(), (String) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.otherRecipeWithTheSameImageExists("Image", "Original Image"));
        verify(recipeRepository).existsByImageUrlAndImageUrlNot((String) any(), (String) any());
    }

    @Test
    void testDetachAllRecipesFromDeletedUser() {
        when(recipeRepository.saveAll((Iterable<RecipeEntity>) any())).thenReturn(new ArrayList<>());
        when(recipeRepository.findAllByOwnerId((Long) any())).thenReturn(new ArrayList<>());
        recipeService.detachAllRecipesFromDeletedUser(new DeleteUserEvent("Source", 123L));
        verify(recipeRepository).saveAll((Iterable<RecipeEntity>) any());
        verify(recipeRepository).findAllByOwnerId((Long) any());
    }

    @Test
    void testDetachAllRecipesFromDeletedUserCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.saveAll((Iterable<RecipeEntity>) any())).thenReturn(new ArrayList<>());
        when(recipeRepository.findAllByOwnerId((Long) any())).thenReturn(recipeEntityList);
        recipeService.detachAllRecipesFromDeletedUser(new DeleteUserEvent("Source", 123L));
        verify(recipeRepository).saveAll((Iterable<RecipeEntity>) any());
        verify(recipeRepository).findAllByOwnerId((Long) any());
    }

    @Test
    void testDetachAllRecipesFromDeletedUserCaseThree() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.saveAll((Iterable<RecipeEntity>) any())).thenReturn(new ArrayList<>());
        when(recipeRepository.findAllByOwnerId((Long) any())).thenReturn(recipeEntityList);
        recipeService.detachAllRecipesFromDeletedUser(new DeleteUserEvent("Source", 123L));
        verify(recipeRepository).saveAll((Iterable<RecipeEntity>) any());
        verify(recipeRepository).findAllByOwnerId((Long) any());
    }

    @Test
    void testDetachAllRecipesFromDeletedUserCaseFour() {
        when(recipeRepository.saveAll((Iterable<RecipeEntity>) any())).thenReturn(new ArrayList<>());
        when(recipeRepository.findAllByOwnerId((Long) any())).thenReturn(new ArrayList<>());
        DeleteUserEvent deleteUserEvent = mock(DeleteUserEvent.class);
        when(deleteUserEvent.getUserId()).thenReturn(123L);
        recipeService.detachAllRecipesFromDeletedUser(deleteUserEvent);
        verify(recipeRepository).saveAll((Iterable<RecipeEntity>) any());
        verify(recipeRepository).findAllByOwnerId((Long) any());
        verify(deleteUserEvent).getUserId();
    }

    @Test
    void testFindRecipesByNameGlobalSearch() {
        when(recipeRepository.findAllByRecipeNameContaining((String) any())).thenReturn(new ArrayList<>());
        GlobalSearchEvent globalSearchEvent = new GlobalSearchEvent("Source", "Query");

        recipeService.findRecipesByNameGlobalSearch(globalSearchEvent);
        verify(recipeRepository).findAllByRecipeNameContaining((String) any());
        assertTrue(globalSearchEvent.getSearchResults().isEmpty());
    }

    @Test
    void testFindRecipesByNameGlobalSearchCaseTwo() {
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

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByRecipeNameContaining((String) any())).thenReturn(recipeEntityList);
        GlobalSearchEvent globalSearchEvent = new GlobalSearchEvent("Source", "Query");

        recipeService.findRecipesByNameGlobalSearch(globalSearchEvent);
        verify(recipeRepository).findAllByRecipeNameContaining((String) any());
        List<AdminGlobalSearchDTO> searchResults = globalSearchEvent.getSearchResults();
        assertEquals(1, searchResults.size());
        AdminGlobalSearchDTO getResult = searchResults.get(0);
        assertEquals("Recipe Name", getResult.getName());
        assertEquals("recipes", getResult.getResultType());
    }

    @Test
    void testFindRecipesByNameGlobalSearchCaseThree() {
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

        RecipeEntity recipeEntity1 = new RecipeEntity();
        recipeEntity1.setCategory(CategoryEnum.CHICKEN);
        recipeEntity1.setCreatedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        recipeEntity1.setId(123L);
        recipeEntity1.setImageUrl("https://example.org/example");
        recipeEntity1.setOwnerId(123L);
        recipeEntity1.setProducts(new ArrayList<>());
        recipeEntity1.setRecipeName("recipes");
        recipeEntity1.setStatus(PublicationStatusEnum.PENDING);
        recipeEntity1.setSteps(new ArrayList<>());
        recipeEntity1.setVisitationsCount(3L);

        ArrayList<RecipeEntity> recipeEntityList = new ArrayList<>();
        recipeEntityList.add(recipeEntity1);
        recipeEntityList.add(recipeEntity);
        when(recipeRepository.findAllByRecipeNameContaining((String) any())).thenReturn(recipeEntityList);
        GlobalSearchEvent globalSearchEvent = new GlobalSearchEvent("Source", "Query");

        recipeService.findRecipesByNameGlobalSearch(globalSearchEvent);
        verify(recipeRepository).findAllByRecipeNameContaining((String) any());
        List<AdminGlobalSearchDTO> searchResults = globalSearchEvent.getSearchResults();
        assertEquals(2, searchResults.size());
        AdminGlobalSearchDTO getResult = searchResults.get(0);
        assertEquals("recipes", getResult.getResultType());
        AdminGlobalSearchDTO getResult1 = searchResults.get(1);
        assertEquals("recipes", getResult1.getResultType());
        assertEquals("Recipe Name", getResult1.getName());
        assertEquals("recipes", getResult.getName());
    }

    @Test
    void testFindRecipesByNameGlobalSearchShouldThrow() {
        when(recipeRepository.findAllByRecipeNameContaining((String) any()))
                .thenThrow(new RecipeWithTheSameNameOrImageAlreadyExistsException("An error occurred"));
        assertThrows(RecipeWithTheSameNameOrImageAlreadyExistsException.class,
                () -> recipeService.findRecipesByNameGlobalSearch(new GlobalSearchEvent("Source", "Query")));
        verify(recipeRepository).findAllByRecipeNameContaining((String) any());
    }
}

