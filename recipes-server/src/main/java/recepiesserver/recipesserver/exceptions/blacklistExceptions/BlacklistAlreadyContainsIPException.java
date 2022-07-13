package recepiesserver.recipesserver.exceptions.blacklistExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BlacklistAlreadyContainsIPException extends RuntimeException {
    public BlacklistAlreadyContainsIPException(String message) {
        super(message);
    }
}
