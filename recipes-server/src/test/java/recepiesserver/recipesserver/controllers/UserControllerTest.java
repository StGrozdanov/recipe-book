package recepiesserver.recipesserver.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.ContentResultMatchers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeFavouritesDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserAdminPanelDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserCountDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserDetailsDTO;
import recepiesserver.recipesserver.models.dtos.userDTOs.UserProfileDTO;
import recepiesserver.recipesserver.services.UserService;

import java.util.List;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.hamcrest.Matchers.is;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private UserController userController;

    private static final Long USER_ID = 1L;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void testGetUserProfile() throws Exception {
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setAvatarUrl("https://example.org/example");
        userProfileDTO.setEmail("jane.doe@example.org");
        userProfileDTO.setRecipesCount(3);
        userProfileDTO.setUsername("janedoe");
        when(userService.getUserProfile((Long) any())).thenReturn(userProfileDTO);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/users/profile/{userId}", 123L);
        MockMvcBuilders.standaloneSetup(userController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"username\":\"janedoe\",\"email\":\"jane.doe@example.org\",\"avatarUrl\":\"https://example.org/example\","
                                        + "\"coverPhotoUrl\":null,\"recipesCount\":3}"));
    }

    @Test
    void testGetAllUsers() throws Exception {
        when(userService.getAllUsers((Integer) any(), (Integer) any(), (String) any())).thenReturn(null);
        MockHttpServletRequestBuilder getResult = MockMvcRequestBuilders.get("/users");
        MockHttpServletRequestBuilder paramResult = getResult.param("limit", String.valueOf(1));
        MockHttpServletRequestBuilder requestBuilder = paramResult.param("skip", String.valueOf(1)).param("sortBy", "foo");
        MockMvcBuilders.standaloneSetup(userController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testGetUserDetails() throws Exception {
        RecipeCatalogueDTO recipeCatalogueDTO = new RecipeCatalogueDTO();
        recipeCatalogueDTO.setId(111L);
        recipeCatalogueDTO.setRecipeName("Мусака");
        recipeCatalogueDTO.setImageUrl("https://example.org/example");

        List<RecipeCatalogueDTO> recipeCatalogueDTOs = List.of(recipeCatalogueDTO);

        UserDetailsDTO user = new UserDetailsDTO();
        user.setUsername("John Doe");
        user.setRecipesCount(1);
        user.setAvatarUrl("https://example.org/example");
        user.setCoverPhotoUrl("https://example.org/example/john");
        user.setEmail("john.doe@example.org");
        user.setRecipes(recipeCatalogueDTOs);

        when(userService.getUser(USER_ID)).thenReturn(user);

        mockMvc.perform(get("/users" + "/" + USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("John Doe")))
                .andExpect(jsonPath("$.recipesCount", is(1)))
                .andExpect(jsonPath("$.avatarUrl", is("https://example.org/example")))
                .andExpect(jsonPath("$.coverPhotoUrl", is("https://example.org/example/john")))
                .andExpect(jsonPath("$.email", is("john.doe@example.org")))
                .andExpect(jsonPath("$.recipes[0].recipeName", is("Мусака")))
                .andExpect(jsonPath("$.recipes[0].id", is(111)))
                .andExpect(jsonPath("$.recipes[0].imageUrl", is("https://example.org/example")));
    }

    @Test
    void testOtherUserExistsByEmail() throws Exception {
        when(userService.otherUserWithSameEmailExists((String) any(), (String) any())).thenReturn(true);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/users/otherExistsByEmail")
                .param("email", "foo")
                .param("userEmail", "foo");
        MockMvcBuilders.standaloneSetup(userController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("{\"emailExists\":true}"));
    }

    @Test
    void testOtherUserExistsByUsername() throws Exception {
        when(userService.otherUserWithSameUsernameExists((String) any(), (String) any())).thenReturn(true);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/users/otherExistsByUsername")
                .param("userUsername", "foo")
                .param("username", "foo");
        MockMvcBuilders.standaloneSetup(userController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("{\"usernameExists\":true}"));
    }

    @Test
    void testSearchUsersByUsername() throws Exception {
        when(userService.findUsersByUsername((String) any(), (Integer) any(), (Integer) any(), (String) any()))
                .thenReturn(null);
        MockHttpServletRequestBuilder getResult = MockMvcRequestBuilders.get("/users/search-by-username");
        MockHttpServletRequestBuilder paramResult = getResult.param("limit", String.valueOf(1));
        MockHttpServletRequestBuilder requestBuilder = paramResult.param("skip", String.valueOf(1))
                .param("sortBy", "foo")
                .param("whereUsername", "foo");
        MockMvcBuilders.standaloneSetup(userController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testTotalUsersCount() throws Exception {
        UserCountDTO userCountDTO = new UserCountDTO();
        userCountDTO.setUsersCount(3L);
        when(userService.getTotalUsersCount()).thenReturn(userCountDTO);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/users/count");
        MockMvcBuilders.standaloneSetup(userController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("{\"usersCount\":3}"));
    }

    @Test
    void testUserExistsByEmail() throws Exception {
        when(userService.userWithTheSameEmailExists((String) any())).thenReturn(true);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/users/existsByEmail")
                .param("email", "foo");
        MockMvcBuilders.standaloneSetup(userController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("{\"emailExists\":true}"));
    }

    @Test
    void testUserExistsByUsername() throws Exception {
        when(userService.userWithTheSameUsernameExists((String) any())).thenReturn(true);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/users/existsByUsername")
                .param("username", "foo");
        MockMvcBuilders.standaloneSetup(userController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("{\"usernameExists\":true}"));
    }

    @Test
    public void testUserProfile() throws Exception {
        UserProfileDTO user = new UserProfileDTO();
        user.setUsername("John Doe");
        user.setRecipesCount(1);
        user.setAvatarUrl("https://example.org/example");
        user.setCoverPhotoUrl("https://example.org/example/john");
        user.setEmail("john.doe@example.org");

        when(userService.getUserProfile(USER_ID)).thenReturn(user);

        mockMvc.perform(get("/users" + "/profile" + "/" + USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("John Doe")))
                .andExpect(jsonPath("$.recipesCount", is(1)))
                .andExpect(jsonPath("$.avatarUrl", is("https://example.org/example")))
                .andExpect(jsonPath("$.coverPhotoUrl", is("https://example.org/example/john")))
                .andExpect(jsonPath("$.email", is("john.doe@example.org")));
    }
}
