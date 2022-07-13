package recepiesserver.recipesserver.exceptions.recipeExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NoSuchRecipeCategoryException extends RuntimeException {
    public NoSuchRecipeCategoryException(String message) {
        super(message);
    }
}
