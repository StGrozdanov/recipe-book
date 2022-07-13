package recepiesserver.recipesserver.exceptions.blacklistExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class IpNotFoundException extends RuntimeException {
    public IpNotFoundException(String message) {
        super(message);
    }
}
