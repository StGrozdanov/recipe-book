package recepiesserver.recipesserver.events;

import org.springframework.context.ApplicationEvent;

public class DeleteUserEvent extends ApplicationEvent {
    private final Long userId;

    public DeleteUserEvent(Object source, Long userId) {
        super(source);
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }
}
