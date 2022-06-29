package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.DTOs.RecipeDTO;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.repositories.RecipeRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ModelMapper modelMapper;

    public RecipeService(RecipeRepository recipeRepository, ModelMapper modelMapper) {
        this.recipeRepository = recipeRepository;
        this.modelMapper = modelMapper;
    }


    @Transactional
    public List<RecipeDTO> getAllRecipes() {
        List<RecipeEntity> allRecipes = this.recipeRepository.findAll();

        return allRecipes
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeDTO.class))
                .toList();
    }
}
