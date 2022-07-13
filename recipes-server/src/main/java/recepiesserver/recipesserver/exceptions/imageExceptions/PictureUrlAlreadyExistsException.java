package recepiesserver.recipesserver.exceptions.imageExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PictureUrlAlreadyExistsException extends RuntimeException {
    public PictureUrlAlreadyExistsException(String message) {
        super(message);
    }
}
