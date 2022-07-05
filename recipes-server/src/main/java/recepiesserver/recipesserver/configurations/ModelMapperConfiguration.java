package recepiesserver.recipesserver.configurations;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentCreateDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCreateDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeEditDTO;
import recepiesserver.recipesserver.models.entities.CommentEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;

import java.util.Arrays;

@Configuration
public class ModelMapperConfiguration {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        Converter<String, CategoryEnum> categoryConverter = new Converter<String, CategoryEnum>() {
            public CategoryEnum convert(MappingContext<String, CategoryEnum> context) {
                return Arrays.stream(CategoryEnum.values())
                        .filter(category -> category.getName().equals(context.getSource()))
                        .findFirst().orElse(null);
            }
        };

        modelMapper
                .typeMap(RecipeCreateDTO.class, RecipeEntity.class)
                .addMappings(mapper -> mapper.skip(RecipeEntity::setId))
                .addMappings(mapper -> {
                    mapper.using(categoryConverter).map(RecipeCreateDTO::getCategory, RecipeEntity::setCategory);
                });

        modelMapper
                .typeMap(RecipeEditDTO.class, RecipeEntity.class)
                .addMappings(mapper -> {
                    mapper.using(categoryConverter).map(RecipeEditDTO::getCategory, RecipeEntity::setCategory);
                });

        modelMapper
                .typeMap(CommentCreateDTO.class, CommentEntity.class)
                .addMappings(mapper -> mapper.skip(CommentEntity::setId));

        return modelMapper;
    }
}