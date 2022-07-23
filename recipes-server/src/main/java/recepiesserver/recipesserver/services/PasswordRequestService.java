package recepiesserver.recipesserver.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.exceptions.requestPasswordExceptions.ExpiredRequestCode;
import recepiesserver.recipesserver.exceptions.requestPasswordExceptions.InvalidRequestCode;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.authDTOs.PasswordRequestCodeDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserEmailDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserPasswordDTO;
import recepiesserver.recipesserver.models.entities.PasswordRequestEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.repositories.PasswordRequestRepository;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class PasswordRequestService {
    private static final Integer TWENTY_MINUTES = 20;

    private final UserService userService;
    private final PasswordRequestRepository passwordRequestRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordRequestService(UserService userService, PasswordRequestRepository passwordRequestRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordRequestRepository = passwordRequestRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public PasswordRequestCodeDTO handleForgottenPassword(UserEmailDTO userEmailDTO) {
        UserEntity targetUser = this.userService
                .findUserByEmail(userEmailDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException(ExceptionMessages.USER_EMAIL_NOT_FOUND));

        LocalDateTime issuedAt = LocalDateTime.now();
        Long issuerId = targetUser.getId();
        String code = UUID.randomUUID().toString();
        PublicationStatusEnum pendingStatus = PublicationStatusEnum.PENDING;

        this.passwordRequestRepository.save(new PasswordRequestEntity(issuedAt, issuerId, code, pendingStatus));

        return new PasswordRequestCodeDTO().setCode(code).setUsername(targetUser.getUsername());
    }

    @Transactional
    public void resetPassword(String code, UserPasswordDTO userPasswordDTO) {
        PasswordRequestEntity passwordRequestEntity = this.passwordRequestRepository
                .findByCode(code)
                .orElseThrow(() -> new InvalidRequestCode(ExceptionMessages.INVALID_CODE));

        if (passwordRequestEntity.getPublicationStatusEnum().name().equals("PENDING")) {
            LocalDateTime issuedAt = passwordRequestEntity.getIssuedAt();
            LocalDateTime currentTime = LocalDateTime.now();

            long passedMinutes = ChronoUnit.MINUTES.between(issuedAt, currentTime);

            if (passedMinutes > TWENTY_MINUTES) {
                throw new ExpiredRequestCode(ExceptionMessages.EXPIRED_CODE);
            }

            passwordRequestEntity.setPublicationStatusEnum(PublicationStatusEnum.APPROVED);
            this.passwordRequestRepository.save(passwordRequestEntity);
        } else {
            if (userPasswordDTO != null) {
                Long userId = passwordRequestEntity.getIssuedByUser();
                UserEntity user = this.userService
                        .findUserById(userId)
                        .orElseThrow(() -> new UserNotFoundException(ExceptionMessages.USER_NOT_FOUND));

                String encodedPassword = this.passwordEncoder.encode(userPasswordDTO.getPassword());

                user.setPassword(encodedPassword);
            }
        }
    }

    public void cleanUpPasswordRequests() {
        LocalDateTime currentTime = LocalDateTime.now();

        List<PasswordRequestEntity> passwordRequestEntities = this.passwordRequestRepository
                .findAll()
                .stream()
                .filter(request -> {
                    LocalDateTime issuedAt = request.getIssuedAt();
                    long passedMinutes = ChronoUnit.MINUTES.between(issuedAt, currentTime);
                    return passedMinutes >= TWENTY_MINUTES;
                })
                .toList();

        this.passwordRequestRepository.deleteAll(passwordRequestEntities);
    }
}
