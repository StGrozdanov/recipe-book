package recepiesserver.recipesserver.models.entities;

import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "password_requests")
public class PasswordRequestEntity extends BaseEntity {
    private LocalDateTime issuedAt;
    private Long issuedByUser;
    private String code;
    private PublicationStatusEnum publicationStatusEnum;

    public PasswordRequestEntity() {
    }

    public PasswordRequestEntity(LocalDateTime issuedAt, Long issuedByUser, String code, PublicationStatusEnum publicationStatusEnum) {
        this.issuedAt = issuedAt;
        this.issuedByUser = issuedByUser;
        this.code = code;
        this.publicationStatusEnum = publicationStatusEnum;
    }

    @Column(nullable = false)
    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }

    public PasswordRequestEntity setIssuedAt(LocalDateTime issuedAt) {
        this.issuedAt = issuedAt;
        return this;
    }

    @Column(nullable = false)
    public Long getIssuedByUser() {
        return issuedByUser;
    }

    public PasswordRequestEntity setIssuedByUser(Long issuedByUser) {
        this.issuedByUser = issuedByUser;
        return this;
    }

    @Column(nullable = false, unique = true)
    public String getCode() {
        return code;
    }

    public PasswordRequestEntity setCode(String code) {
        this.code = code;
        return this;
    }

    @Enumerated(EnumType.STRING)
    public PublicationStatusEnum getPublicationStatusEnum() {
        return publicationStatusEnum;
    }

    public PasswordRequestEntity setPublicationStatusEnum(PublicationStatusEnum publicationStatusEnum) {
        this.publicationStatusEnum = publicationStatusEnum;
        return this;
    }
}
