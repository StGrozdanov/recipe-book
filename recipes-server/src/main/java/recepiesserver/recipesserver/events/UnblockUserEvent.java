package recepiesserver.recipesserver.events;

import org.springframework.context.ApplicationEvent;

import java.util.Set;

public class UnblockUserEvent extends ApplicationEvent {
    private final Set<String> ipAddresses;

    public UnblockUserEvent(Object source, Set<String> ipAddresses) {
        super(source);
        this.ipAddresses = ipAddresses;
    }

    public Set<String> getIpAddresses() {
        return ipAddresses;
    }
}
