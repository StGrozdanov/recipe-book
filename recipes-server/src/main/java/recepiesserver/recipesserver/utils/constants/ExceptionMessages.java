package recepiesserver.recipesserver.utils.constants;

public class ExceptionMessages {
    public static final String INVALID_CREDENTIALS = "Invalid username or password.";
    public static final String MISSING_TOKEN = "Your token is either missing or invalid.";
    public static final String INVALID_TOKEN = "Your token is expired or invalid.";
    public static final String USER_NOT_FOUND = "There is no user with such id.";
    public static final String RECIPE_NOT_FOUND = "There is no recipe with such id.";
    public static final String COMMENT_NOT_FOUND = "There is no comment with such id.";
    public static final String NOTIFICATION_NOT_FOUND = "There is no notification with such id.";
    public static final String NO_SUCH_ACTION = "You specified invalid notification action.";
    public static final String PICTURE_NOT_FOUND = "No picture file or picture url is provided.";
    public static final String PICTURE_ALREADY_EXISTS = "Picture with the same url already exists.";
    public static final String RECIPE_ALREADY_EXISTS = "Recipe with the same name or picture already exists.";
    public static final String RECIPE_ALREADY_APPROVED = "This recipe is already approved.";
    public static final String RECIPE_CATEGORY_NOT_FOUND = "The provided recipe category is invalid.";
    public static final String USER_ALREADY_EXISTS = "User with the same username or email already exists.";
    public static final String USER_ALREADY_BLOCKED = "The user you tried to block is already blocked.";
    public static final String USER_IS_NOT_BLOCKED = "The user you tried to unblock is not blocked at all.";
    public static final String INVALID_FILE_FORMAT = "Something went wrong while converting the multipart file.";
    public static final String BLACKLIST_ALREADY_CONTAINS_IP = "Blacklist already contains one of the ip addresses you attempted to add.";
    public static final String BLACKLIST_DOES_NOT_CONTAIN_IP = "One of the requested user IP to remove from the blacklist is non existent.";
}
