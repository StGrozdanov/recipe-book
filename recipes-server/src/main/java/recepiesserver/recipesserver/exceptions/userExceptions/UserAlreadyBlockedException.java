package recepiesserver.recipesserver.exceptions.userExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserAlreadyBlockedException extends RuntimeException {
    public UserAlreadyBlockedException(String message) {
        super(message);
    }
}
