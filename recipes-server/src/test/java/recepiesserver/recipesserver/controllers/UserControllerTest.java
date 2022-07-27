package recepiesserver.recipesserver.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserDetailsDTO;
import recepiesserver.recipesserver.services.UserService;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.hamcrest.Matchers.is;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    private static final Long USER_ID = 1L;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void testGetUserDetails() throws Exception {
        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(111L);
        recipeCatalogueDTO.setRecipeName("Мусака");
        recipeCatalogueDTO.setImageUrl("https://example.com/example");

        List<RecipeCatalogueDTO> recipeCatalogueDTOs = List.of(recipeCatalogueDTO);

        UserDetailsDTO user = new UserDetailsDTO();
        user.setUsername("John Doe");
        user.setRecipesCount(1);
        user.setAvatarUrl("https://example.com/example");
        user.setCoverPhotoUrl("https://example.com/example/john");
        user.setEmail("john@gmail.com");
        user.setRecipes(recipeCatalogueDTOs);

        when(userService.getUser(USER_ID)).thenReturn(user);

        mockMvc.perform(get("/users" + "/" + USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("John Doe")))
                .andExpect(jsonPath("$.recipesCount", is(1)))
                .andExpect(jsonPath("$.avatarUrl", is("https://example.com/example")))
                .andExpect(jsonPath("$.coverPhotoUrl", is("https://example.com/example/john")))
                .andExpect(jsonPath("$.email", is("john@gmail.com")))
                .andExpect(jsonPath("$.recipes[0].recipeName", is("Мусака")))
                .andExpect(jsonPath("$.recipes[0].id", is(111)))
                .andExpect(jsonPath("$.recipes[0].imageUrl", is("https://example.com/example")));
    }
}
