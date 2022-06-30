package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import recepiesserver.recipesserver.models.DTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.DTOs.RecipeDetailsDTO;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.repositories.RecipeRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ModelMapper modelMapper;

    public RecipeService(RecipeRepository recipeRepository, ModelMapper modelMapper) {
        this.recipeRepository = recipeRepository;
        this.modelMapper = modelMapper;
    }

    public List<RecipeCatalogueDTO> getAllRecipes() {
        List<RecipeEntity> allRecipes = this.recipeRepository.findAll();

        return allRecipes
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    @Transactional
    public Optional<RecipeDetailsDTO> getSingleRecipe(Long id) {
        Optional<RecipeEntity> optionalEntity = this.recipeRepository.findById(id);

        RecipeDetailsDTO recipeDetailsDTO = this.modelMapper.map(optionalEntity, RecipeDetailsDTO.class);

        return Optional.ofNullable(recipeDetailsDTO);
    }

    @Transactional
    public void deleteRecipe(Long id) {
        this.recipeRepository.deleteById(id);
    }

    public Page<RecipeCatalogueDTO> getRecipesByPage( Integer pageNumber, Integer collectionCount, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, collectionCount, Sort.by(sortBy));

        return this.recipeRepository
                .findAll(pageable)
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class));
    }
}
