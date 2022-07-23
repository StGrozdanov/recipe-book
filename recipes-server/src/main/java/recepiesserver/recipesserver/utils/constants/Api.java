package recepiesserver.recipesserver.utils.constants;

public class Api {
    public static final String PREFIX = "/**";
    //authentication
    public static final String LOGIN = "/authenticate/login";
    public static final String REGISTER = "/authenticate/register";
    public static final String LOGOUT = "/authenticate/logout";
    public static final String REFRESH_TOKEN = "/authenticate/token/refresh";
    public static final String CHECK_CREDENTIALS = "/authenticate/credentials-check/{userId}";
    public static final String FORGOTTEN_PASSWORD = "/forgotten-password";
    public static final String RESET_PASSWORD = "/password-reset/{code}";
    //comments
    public static final String GET_ALL_RECIPE_COMMENTS = "/comments/{recipeId}";
    public static final String COMMENT_ENDPOINT = "/comments";
    public static final String DELETE_COMMENT = "/comments/{id}";
    public static final String EDIT_COMMENT = "/comments/{id}";
    public static final String LATEST_SIX_COMMENTS = "/comments/latest-six-comments";
    public static final String COMMENT_COUNT = "/comments/count";
    public static final String SEARCH_COMMENTS_BY_CONTENT = "/comments/search-by-content";
    public static final String GET_ALL_COMMENTS = "/comments/admin";
    //notifications
    public static final String USER_NOTIFICATIONS = "/notifications/{userId}";
    public static final String MARK_NOTIFICATION_AS_READ = "/notifications/{notificationId}";
    public static final String NOTIFICATION_ENDPOINT = "/notifications";
    public static final String USER_NOTIFICATIONS_COUNT = "/notifications/{userId}/count";
    //recipes
    public static final String RECIPES_ENDPOINT = "/recipes";
    public static final String EDIT_RECIPE = "/recipes/{recipeId}";
    public static final String RECIPE_PAGES = "/recipes/pagination";
    public static final String GET_SINGLE_RECIPE = "/recipes/{id}";
    public static final String DELETE_RECIPE = "/recipes/{id}";
    public static final String LATEST_THREE_RECIPES = "/recipes/latest-three-recipes";
    public static final String MOST_VIEWED_THREE_RECIPES = "/recipes/most-viewed-three-recipes";
    public static final String RECORD_NEW_RECIPE_VISITATION = "/recipes/{id}/new-visitation";
    public static final String ADD_RECIPE_TO_FAVOURITES = "/recipes/add-to-favourites";
    public static final String REMOVE_RECIPE_FROM_FAVOURITES = "/recipes/remove-from-favourites";
    public static final String SEARCH_BY_RECIPE_NAME = "/recipes/search-by-name";
    public static final String USER_CREATED_RECIPES = "/recipes/created-by/{userId}";
    public static final String USER_CREATED_RECIPES_COUNT = "/recipes/created-by/{userId}/count";
    public static final String SEARCH_IN_CREATED_RECIPES = "/recipes/search-in-created-recipes";
    public static final String SEARCH_BY_RECIPE_CATEGORY = "/recipes/search-by-categories";
    public static final String RECIPES_COUNT = "/recipes/count";
    public static final String RECIPES_MOST_ACTIVE_USER = "/recipes/most-active-user";
    public static final String RECIPES_FOR_ADMIN = "/recipes/admin";
    public static final String APPROVE_RECIPE = "/recipes/approve/{id}";
    public static final String RECIPE_NAME_EXISTS = "/recipes/existsByName";
    public static final String RECIPE_PICTURE_EXISTS = "/recipes/existsByPicture";
    public static final String OTHER_RECIPE_NAME_EXISTS = "/recipes/otherExistsByName";
    public static final String OTHER_RECIPE_PICTURE_EXISTS = "/recipes/otherExistsByPicture";
    public static final String RECIPES_FOR_ADMIN_SEARCH = "/recipes/admin/search-by-name";
    //users
    public static final String GET_USER_DETAILS = "/users/{userId}";
    public static final String GET_USER_PROFILE = "/users/profile/{userId}";
    public static final String EDIT_USER_PROFILE = "/users/profile/{userId}";
    public static final String EDIT_USER_PROFILE_ADMIN = "/users/administrate/profile/{userId}";
    public static final String CHANGE_USER_PASSWORD = "/users/changePassword/{userId}";
    public static final String GET_USER_FAVOURITE_RECIPES = "/users/favourites/{userId}";
    public static final String SEARCH_IN_USER_FAVOURITES_RECIPES = "/users/search-favourite-recipe-by-name";
    public static final String RECIPE_IS_IN_USER_FAVOURITES = "/users/recipe-is-in-favourites";
    public static final String USERS_COUNT = "/users/count";
    public static final String SEARCH_USERS_BY_USERNAME = "/users/search-by-username";
    public static final String CHANGE_USER_ROLE = "/users/change-role/{userId}";
    public static final String BLOCK_USER = "/users/block";
    public static final String UNBLOCK_USER = "/users/unblock/{userId}";
    public static final String DELETE_USER = "/users/{userId}";
    public static final String USER_EXISTS_BY_USERNAME = "/users/existsByUsername";
    public static final String USER_EXISTS_BY_EMAIL = "/users/existsByEmail";
    public static final String OTHER_USER_EXISTS_BY_USERNAME = "/users/otherExistsByUsername";
    public static final String OTHER_USER_EXISTS_BY_EMAIL = "/users/otherExistsByEmail";
    public static final String GET_ALL_USERS = "/users";
    //visitations
    public static final String VISITATIONS_ENDPOINT = "/visitations";
    public static final String VISITATIONS_FOR_GIVEN_MONTH = "/visitations/by-target-month";
    public static final String VISITATIONS_FOR_LAST_SIX_MONTHS = "/visitations/the-last-six-months";
    public static final String VISITATIONS_TODAY = "/visitations/today";
    public static final String VISITATIONS_FOR_LAST_SIX_MONTHS_SUMMARY = "/visitations/the-last-six-months-summary";
    //global search
    public static final String GLOBAL_SEARCH_ADMIN = "/global-search/admin";
}
