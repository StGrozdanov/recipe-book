package recepiesserver.recipesserver.events;

import org.springframework.context.ApplicationEvent;

import java.util.Set;

public class BlockUserEvent extends ApplicationEvent {
    private final Set<String> ipAddresses;
    private final String reason;

    public BlockUserEvent(Object source, Set<String> ipAddresses, String reason) {
        super(source);
        this.ipAddresses = ipAddresses;
        this.reason = reason;
    }

    public Set<String> getIpAddresses() {
        return ipAddresses;
    }

    public String getReason() {
        return reason;
    }
}
