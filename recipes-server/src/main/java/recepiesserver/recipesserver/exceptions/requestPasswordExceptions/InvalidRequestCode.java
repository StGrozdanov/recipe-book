package recepiesserver.recipesserver.exceptions.requestPasswordExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidRequestCode extends RuntimeException {
    public InvalidRequestCode(String message) {
        super(message);
    }
}
