package recepiesserver.recipesserver.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import recepiesserver.recipesserver.filters.AuthorizationFilter;
import recepiesserver.recipesserver.models.enums.RoleEnum;
import recepiesserver.recipesserver.repositories.UserRepository;
import recepiesserver.recipesserver.services.AppUserDetailsService;
import recepiesserver.recipesserver.utils.constants.Api;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {
    private final AuthorizationFilter authorizationFilter;

    public SecurityConfiguration(AuthorizationFilter authorizationFilter) {
        this.authorizationFilter = authorizationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Pbkdf2PasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(STATELESS)
                .and()
                .authorizeRequests()

                //authentication controller
                .antMatchers(Api.LOGOUT, Api.CHECK_CREDENTIALS).authenticated()
                .antMatchers(Api.LOGIN, Api.REGISTER).anonymous()
                .antMatchers(Api.REFRESH_TOKEN).permitAll()

                //comment controller
                .antMatchers(
                        Api.COMMENT_COUNT,
                        Api.SEARCH_COMMENTS_BY_CONTENT,
                        Api.GET_ALL_COMMENTS
                ).hasRole(RoleEnum.ADMINISTRATOR.name())
                .antMatchers(Api.LATEST_SIX_COMMENTS, Api.GET_ALL_RECIPE_COMMENTS).permitAll()
                .antMatchers(POST, Api.COMMENT_ENDPOINT).authenticated()
                .antMatchers(PUT, Api.COMMENT_ENDPOINT).authenticated()
                .antMatchers(Api.DELETE_COMMENT, Api.EDIT_COMMENT).authenticated()

                //notification controller
                .antMatchers(Api.NOTIFICATION_ENDPOINT + Api.PREFIX).authenticated()

                //recipes controller
                .antMatchers(
                        Api.RECIPES_MOST_ACTIVE_USER,
                        Api.RECIPES_FOR_ADMIN,
                        Api.APPROVE_RECIPE,
                        Api.RECIPES_FOR_ADMIN_SEARCH
                ).hasRole(RoleEnum.ADMINISTRATOR.name())
                .antMatchers(GET,
                        Api.RECIPES_ENDPOINT,
                        Api.RECIPE_PAGES,
                        Api.GET_SINGLE_RECIPE,
                        Api.LATEST_THREE_RECIPES,
                        Api.MOST_VIEWED_THREE_RECIPES,
                        Api.SEARCH_BY_RECIPE_NAME,
                        Api.USER_CREATED_RECIPES,
                        Api.USER_CREATED_RECIPES_COUNT,
                        Api.RECIPES_COUNT
                ).permitAll()
                .antMatchers(Api.RECORD_NEW_RECIPE_VISITATION, Api.SEARCH_BY_RECIPE_CATEGORY).permitAll()
                .antMatchers(
                        Api.DELETE_RECIPE,
                        Api.EDIT_RECIPE,
                        Api.ADD_RECIPE_TO_FAVOURITES,
                        Api.REMOVE_RECIPE_FROM_FAVOURITES,
                        Api.SEARCH_IN_CREATED_RECIPES,
                        Api.RECIPE_NAME_EXISTS,
                        Api.RECIPE_PICTURE_EXISTS,
                        Api.OTHER_RECIPE_NAME_EXISTS,
                        Api.OTHER_RECIPE_PICTURE_EXISTS
                ).authenticated()
                .antMatchers(POST, Api.RECIPES_ENDPOINT).authenticated()

                //users controller
                .antMatchers(
                        Api.USERS_COUNT,
                        Api.SEARCH_USERS_BY_USERNAME,
                        Api.CHANGE_USER_ROLE,
                        Api.BLOCK_USER,
                        Api.UNBLOCK_USER,
                        Api.DELETE_USER,
                        Api.GET_ALL_USERS,
                        Api.EDIT_USER_PROFILE_ADMIN
                ).hasRole(RoleEnum.ADMINISTRATOR.name())
                .antMatchers(
                        Api.EDIT_USER_PROFILE,
                        Api.SEARCH_IN_USER_FAVOURITES_RECIPES,
                        Api.RECIPE_IS_IN_USER_FAVOURITES,
                        Api.GET_USER_FAVOURITE_RECIPES,
                        Api.CHANGE_USER_PASSWORD
                ).authenticated()
                .antMatchers(
                        Api.GET_USER_DETAILS,
                        Api.GET_USER_PROFILE,
                        Api.USER_EXISTS_BY_USERNAME,
                        Api.USER_EXISTS_BY_EMAIL,
                        Api.OTHER_USER_EXISTS_BY_EMAIL,
                        Api.OTHER_USER_EXISTS_BY_USERNAME
                ).permitAll()

                //visitations controller
                .antMatchers(GET, Api.VISITATIONS_ENDPOINT).hasRole(RoleEnum.ADMINISTRATOR.name())
                .antMatchers(POST, Api.VISITATIONS_ENDPOINT).permitAll()
                .antMatchers(
                        Api.VISITATIONS_ENDPOINT + Api.PREFIX
                ).hasRole(RoleEnum.ADMINISTRATOR.name())

                //global-search controller
                .antMatchers(Api.GLOBAL_SEARCH_ADMIN).hasRole(RoleEnum.ADMINISTRATOR.name())

                .and()
                .addFilterBefore(this.authorizationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository) {
        return new AppUserDetailsService(userRepository);
    }
}