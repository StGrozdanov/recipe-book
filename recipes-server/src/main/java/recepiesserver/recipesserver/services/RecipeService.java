package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.exceptions.imageExceptions.NoPictureProvidedException;
import recepiesserver.recipesserver.exceptions.imageExceptions.PictureUrlAlreadyExistsException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.NoSuchRecipeCategoryException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeAlreadyApprovedException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeNotFoundException;
import recepiesserver.recipesserver.exceptions.recipeExceptions.RecipeWithTheSameNameOrImageAlreadyExistsException;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.*;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserMostActiveDTO;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.models.interfaces.ImageUrl;
import recepiesserver.recipesserver.repositories.RecipeRepository;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final CommentService commentService;
    private final AmazonS3Service amazonS3Service;

    public RecipeService(RecipeRepository recipeRepository, ModelMapper modelMapper, UserService userService, @Lazy CommentService commentService, AmazonS3Service amazonS3Service) {
        this.recipeRepository = recipeRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.commentService = commentService;
        this.amazonS3Service = amazonS3Service;
    }

    public List<RecipeCatalogueDTO> getAllRecipes() {
        return this.recipeRepository
                .findAll()
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    @Transactional
    public RecipeDetailsDTO getSingleRecipe(Long id) {
        RecipeEntity recipeById = this.getRecipeById(id);
        return this.modelMapper.map(recipeById, RecipeDetailsDTO.class);
    }

    @Transactional
    public RecipeModifiedAtDTO deleteRecipe(Long id) {
        RecipeEntity recipe = this.getRecipeById(id);

        this.deleteAllCommentsAttachedToTheTargetRecipe(recipe);

        this.deleteRecipeAmazonPictureIfPresent(recipe);

        this.recipeRepository.deleteById(id);

        return new RecipeModifiedAtDTO().setModifiedAt(LocalDateTime.now());
    }

    public Page<RecipeCatalogueDTO> getRecipesByPage(Integer pageNumber, Integer collectionCount, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, collectionCount, Sort.by(sortBy));

        List<RecipeCatalogueDTO> recipeCatalogueDTOS = this.recipeRepository
                .findAll(pageable)
                .stream()
                .filter(recipe -> recipe.getStatus() != PublicationStatusEnum.PENDING)
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();

        return new PageImpl<>(recipeCatalogueDTOS);
    }

    public RecipeIdDTO createNewRecipe(RecipeCreateDTO recipeDTO, MultipartFile multipartFile) {
        boolean pictureUrlProvided = isPictureUrlProvided(recipeDTO);

        this.handleNoPictureProvided(multipartFile, pictureUrlProvided);

        this.uploadFileToAmazonIfFileIsProvidedAndSetAsDTOImageUrl(recipeDTO, multipartFile, pictureUrlProvided);

        RecipeEntity newRecipe = this.modelMapper.map(recipeDTO, RecipeEntity.class);
        RecipeEntity createdRecipe = this.recipeRepository.save(newRecipe);

        return this.modelMapper.map(createdRecipe, RecipeIdDTO.class);
    }

    public Optional<RecipeEntity> findRecipeById(Long id) {
        return this.recipeRepository.findById(id);
    }

    public RecipeIdDTO editRecipe(RecipeEditDTO recipeDTO, MultipartFile multipartFile, Long recipeId) {
        RecipeEntity oldRecipe = this.getRecipeById(recipeId);

        boolean pictureUrlProvided = isPictureUrlProvided(recipeDTO);

        this.handleNoPictureProvided(multipartFile, pictureUrlProvided);

        this.uploadFileToAmazonIfFileIsProvidedAndSetAsDTOImageUrl(recipeDTO, multipartFile, pictureUrlProvided);

        boolean recipeWithTheSameNameOrImageAlreadyExists =
                this.otherRecipeWithTheSameNameOrImageExists(recipeDTO, oldRecipe);

        if (recipeWithTheSameNameOrImageAlreadyExists) {
            throw new RecipeWithTheSameNameOrImageAlreadyExistsException(ExceptionMessages.RECIPE_ALREADY_EXISTS);
        }

        this.deleteOldRecipePictureFromAmazonIfTheAmazonPictureIsChanged(oldRecipe, recipeDTO);

        setTheOldRecipeDefaultInformationToTheEditedRecipe(oldRecipe, recipeDTO);

        this.recipeRepository.save(oldRecipe);

        return new RecipeIdDTO().setRecipeId(recipeId);
    }

    public List<RecipeCatalogueDTO> findRecipesByUser(Long userId) {
        return this.recipeRepository
                .findAllByOwnerId(userId)
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    public RecipeCountDTO getUserRecipesCount(Long userId) {
        Integer recipeCount = this.recipeRepository.countByOwnerId(userId);
        return new RecipeCountDTO().setRecipesCount(recipeCount);
    }

    public boolean recipeWithTheSameImageExists(String imageUrl) {
        return this.recipeRepository.existsByImageUrl(imageUrl);
    }

    public boolean recipeWithTheSameNameExists(String recipeName) {
        return this.recipeRepository.existsByRecipeName(recipeName);
    }

    public List<RecipeLandingPageDTO> getTheLatestThreeRecipes() {
        return this.recipeRepository
                .findTop3ByOrderByCreatedAtDesc()
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeLandingPageDTO.class))
                .toList();
    }

    public List<RecipeCatalogueDTO> getTheThreeMostViewedRecipes() {
        return this.recipeRepository
                .findTop3ByOrderByVisitationsCountDesc()
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    @Modifying
    public RecipeVisitationDTO incrementRecipeVisitations(Long id) {
        RecipeEntity recipe = this.getRecipeById(id);

        Long oldVisitationCount = recipe.getVisitationsCount();

        long newVisitationCount = Long.sum(oldVisitationCount, 1);

        recipe.setVisitationsCount(newVisitationCount);
        this.recipeRepository.save(recipe);

        return new RecipeVisitationDTO().setVisitationsCount(newVisitationCount);
    }

    @Transactional
    public RecipeModifiedAtDTO addRecipeToUserFavourites(RecipeFavouritesDTO favouritesDTO) {
        UserEntity user = this.getUserById(favouritesDTO.getUserId());
        RecipeEntity recipe = this.getRecipeById(favouritesDTO.getRecipeId());

        user.addRecipeToFavourites(recipe);

        return new RecipeModifiedAtDTO().setModifiedAt(LocalDateTime.now());
    }

    @Transactional
    public RecipeModifiedAtDTO removeRecipeFromUserFavourites(RecipeFavouritesDTO favouritesDTO) {
        UserEntity user = this.getUserById(favouritesDTO.getUserId());
        RecipeEntity recipe = this.getRecipeById(favouritesDTO.getRecipeId());

        user.removeRecipeFromFavourites(recipe);

        return new RecipeModifiedAtDTO().setModifiedAt(LocalDateTime.now());
    }

    public List<RecipeCatalogueDTO> findRecipesByName(String name) {
        return this.recipeRepository
                .findAllByRecipeNameContaining(name)
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    public List<RecipeCatalogueDTO> findUserOwnedRecipesByName(String name, Long userId) {
        return this.recipeRepository
                .findAllByOwnerIdAndRecipeNameContaining(userId, name)
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    public List<RecipeCatalogueDTO> findRecipesByCategories(RecipeCategoriesDTO recipeCategoriesDTO) {
        List<CategoryEnum> categoryEnums =
                this.convertCategoryNamesCollectionToCategoryEnumsCollection(recipeCategoriesDTO);

        return this.recipeRepository
                .findAllByCategoryIn(categoryEnums)
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    public RecipeCountDTO getTotalRecipesCount() {
        long count = this.recipeRepository.count();
        return new RecipeCountDTO().setRecipesCount(Math.toIntExact(count));
    }

    public UserMostActiveDTO findTheMostActiveUser() {
        Long mostActiveUserId = this.recipeRepository.findMostActiveUser();

        UserEntity user = this.getUserById(mostActiveUserId);

        UserMostActiveDTO mostActiveUser = this.modelMapper.map(user, UserMostActiveDTO.class);

        Integer recipeCount = this.recipeRepository.countByOwnerId(mostActiveUserId);
        Integer commentCount = this.commentService.getUserCommentCount(mostActiveUserId);
        Integer publicationsCount = recipeCount + commentCount;

        mostActiveUser.setRecipesCount(recipeCount);
        mostActiveUser.setCommentsCount(commentCount);
        mostActiveUser.setTotalPublicationsCount(publicationsCount);

        return mostActiveUser;
    }

    public List<RecipeAdminPanelDTO> getAllAdminPanelRecipes() {
        return this.recipeRepository
                .findAll()
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeAdminPanelDTO.class))
                .toList();
    }

    @Modifying
    public RecipeModifiedAtDTO approveRecipe(Long id) {
        RecipeEntity recipe = this.getRecipeById(id);

        if (recipe.getStatus().equals(PublicationStatusEnum.PENDING)) {
            recipe.setStatus(PublicationStatusEnum.APPROVED);
            this.recipeRepository.save(recipe);
        } else {
            throw new RecipeAlreadyApprovedException(ExceptionMessages.RECIPE_ALREADY_APPROVED);
        }
        return new RecipeModifiedAtDTO().setModifiedAt(LocalDateTime.now());
    }

    public String getRecipeOwnerUsername(Long recipeId) {
        Long ownerId = this.getRecipeById(recipeId).getOwnerId();
        return this.getUserById(ownerId).getUsername();
    }

    private RecipeEntity getRecipeById(Long id) {
        return this.recipeRepository
                .findById(id)
                .orElseThrow(() -> new RecipeNotFoundException(ExceptionMessages.RECIPE_NOT_FOUND));
    }

    private List<CategoryEnum> convertCategoryNamesCollectionToCategoryEnumsCollection(
            RecipeCategoriesDTO recipeCategoriesDTO) {
        List<CategoryEnum> categories = new ArrayList<>();

        recipeCategoriesDTO
                .getCategories()
                .forEach(categoryName -> {
                            CategoryEnum categoryEnum = getCategoryEnumByCategoryName(categoryName);
                            categories.add(categoryEnum);
                        }
                );
        return categories.stream().distinct().toList();
    }

    private CategoryEnum getCategoryEnumByCategoryName(String categoryName) {
        return Arrays.stream(CategoryEnum.values())
                .filter(category -> category.getName().equals(categoryName))
                .findFirst()
                .orElseThrow(() -> new NoSuchRecipeCategoryException(ExceptionMessages.RECIPE_CATEGORY_NOT_FOUND));
    }

    private void deleteAllCommentsAttachedToTheTargetRecipe(RecipeEntity recipe) {
        this.commentService
                .getAllCommentsForTargetRecipe(recipe.getId())
                .forEach(comment -> this.commentService.deleteComment(comment.getId()));
    }

    private void deleteRecipeAmazonPictureIfPresent(RecipeEntity recipe) {
        if (recipe.getImageUrl().contains("amazonaws")) {
            this.amazonS3Service.deleteFile(recipe.getImageUrl());
        }
    }

    private UserEntity getUserById(Long userId) {
        return this.userService
                .findUserById(userId)
                .orElseThrow(() -> new UserNotFoundException(ExceptionMessages.USER_NOT_FOUND));
    }

    private boolean isPictureUrlProvided(ImageUrl dto) {
        return dto.getImageUrl() != null && !dto.getImageUrl().isBlank();
    }

    private void handleNoPictureProvided(MultipartFile multipartFile, boolean pictureUrlProvided) {
        if (multipartFile.isEmpty() && !pictureUrlProvided) {
            throw new NoPictureProvidedException(ExceptionMessages.PICTURE_NOT_FOUND);
        }
    }

    private void uploadFileToAmazonIfFileIsProvidedAndSetAsDTOImageUrl(ImageUrl dto,
                                                                       MultipartFile multipartFile,
                                                                       boolean pictureUrlProvided) {
        if (!pictureUrlProvided) {
            String uploadedFileURL = this.amazonS3Service.uploadFile(multipartFile);

            boolean providedImageUrlIsAlreadyTaken = this.recipeWithTheSameImageExists(uploadedFileURL);

            if (providedImageUrlIsAlreadyTaken) {
                throw new PictureUrlAlreadyExistsException(ExceptionMessages.PICTURE_ALREADY_EXISTS);
            }

            dto.setImageUrl(uploadedFileURL);
        }
    }

    private void deleteOldRecipePictureFromAmazonIfTheAmazonPictureIsChanged(RecipeEntity oldRecipe,
                                                                             RecipeEditDTO recipeDTO) {
        if (!oldRecipe.getImageUrl().equals(recipeDTO.getImageUrl()) &&
                oldRecipe.getImageUrl().contains("amazonaws")) {
            this.amazonS3Service.deleteFile(oldRecipe.getImageUrl());
        }
    }

    private void setTheOldRecipeDefaultInformationToTheEditedRecipe(RecipeEntity oldRecipe,
                                                                    RecipeEditDTO editedRecipe) {
        oldRecipe.setRecipeName(editedRecipe.getRecipeName());
        oldRecipe.setImageUrl(editedRecipe.getImageUrl());
        oldRecipe.setProducts(editedRecipe.getProducts().stream().filter(product -> !product.isBlank()).toList());
        oldRecipe.setSteps(editedRecipe.getSteps().stream().filter(step -> !step.isBlank()).toList());
    }

    private boolean otherRecipeWithTheSameNameOrImageExists(RecipeEditDTO recipeDTO, RecipeEntity oldRecipeInfo) {
        Boolean nonUniqueRecipeName = this.recipeRepository
                .existsByRecipeNameAndRecipeNameNot(recipeDTO.getRecipeName(), oldRecipeInfo.getRecipeName());
        Boolean nonUniqueImageUrl = this.recipeRepository
                .existsByImageUrlAndImageUrlNot(recipeDTO.getImageUrl(), oldRecipeInfo.getImageUrl());

        return nonUniqueRecipeName || nonUniqueImageUrl;
    }
}