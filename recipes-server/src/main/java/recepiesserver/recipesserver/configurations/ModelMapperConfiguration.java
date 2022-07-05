package recepiesserver.recipesserver.configurations;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import recepiesserver.recipesserver.models.dtos.commentDTOs.CommentCreateDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationCreateDTO;
import recepiesserver.recipesserver.models.dtos.notificationDTOs.NotificationDetailsDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCreateDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeEditDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeLandingPageDTO;
import recepiesserver.recipesserver.models.entities.CommentEntity;
import recepiesserver.recipesserver.models.entities.NotificationEntity;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.enums.CategoryEnum;
import recepiesserver.recipesserver.models.enums.NotificationActionEnum;

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

        Converter<CategoryEnum, String> categoryToStringConverter = new Converter<CategoryEnum, String>() {
            public String convert(MappingContext<CategoryEnum, String> context) {
                return context.getSource().getName();
            }
        };

        Converter<NotificationActionEnum, String> actionConverter = new Converter<NotificationActionEnum, String>() {
            public String convert(MappingContext<NotificationActionEnum, String> context) {
                return context.getSource().getName();
            }
        };

        Converter<String, NotificationActionEnum> actionFromStringConverter = new Converter<String, NotificationActionEnum>() {
            public NotificationActionEnum convert(MappingContext<String, NotificationActionEnum> context) {
                return Arrays.stream(NotificationActionEnum.values())
                        .filter(action -> action.getName().equals(context.getSource()))
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
                .typeMap(RecipeEntity.class, RecipeLandingPageDTO.class)
                .addMappings(mapper -> {
                    mapper
                            .using(categoryToStringConverter)
                            .map(RecipeEntity::getCategory, RecipeLandingPageDTO::setCategory);
                });

        modelMapper
                .typeMap(CommentCreateDTO.class, CommentEntity.class)
                .addMappings(mapper -> mapper.skip(CommentEntity::setId));

        modelMapper
                .typeMap(NotificationEntity.class, NotificationDetailsDTO.class)
                .addMappings(mapper -> {
                    mapper.using(actionConverter).map(NotificationEntity::getAction, NotificationDetailsDTO::setAction);
                });

        modelMapper
                .addMappings(new PropertyMap<NotificationCreateDTO, NotificationEntity>() {
                    protected void configure() {
                        skip().setId(0L);
                    }
                });

        modelMapper
                .typeMap(NotificationCreateDTO.class, NotificationEntity.class)
                .addMappings(mapper -> {
                    mapper
                            .using(actionFromStringConverter)
                            .map(NotificationCreateDTO::getAction, NotificationEntity::setAction);
                });

        return modelMapper;
    }
}