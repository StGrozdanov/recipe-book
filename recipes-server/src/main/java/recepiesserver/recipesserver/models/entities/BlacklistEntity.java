package recepiesserver.recipesserver.models.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "blacklist")
public class BlacklistEntity extends BaseEntity {
    private String ipAddress;
    private String reason;

    public BlacklistEntity() {
    }

    public BlacklistEntity(String ipAddress, String reason) {
        this.ipAddress = ipAddress;
        this.reason = reason;
    }

    @Column(name = "ip_address", nullable = false, unique = true, columnDefinition = "TEXT")
    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    @Column(name = "reason", nullable = false, columnDefinition = "TEXT")
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}