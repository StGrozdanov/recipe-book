package recepiesserver.recipesserver.exceptions.notificationExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NoSuchNotificationActionException extends RuntimeException {
    public NoSuchNotificationActionException(String message) {
        super(message);
    }
}
