package recepiesserver.recipesserver.exceptions.imageExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_GATEWAY)
public class UnsuccessfulAmazonOperationException extends RuntimeException {
    public UnsuccessfulAmazonOperationException(String message) {
        super(message);
    }
}
