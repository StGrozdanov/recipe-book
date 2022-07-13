package recepiesserver.recipesserver.exceptions.imageExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoPictureProvidedException extends RuntimeException {
    public NoPictureProvidedException(String message) {
        super(message);
    }
}
