package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recepiesserver.recipesserver.exceptions.requestPasswordExceptions.ExpiredRequestCode;
import recepiesserver.recipesserver.exceptions.requestPasswordExceptions.InvalidRequestCode;
import recepiesserver.recipesserver.exceptions.userExceptions.UserNotFoundException;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserEmailDTO;
import recepiesserver.recipesserver.models.dtos.authDTOs.UserPasswordDTO;
import recepiesserver.recipesserver.models.entities.PasswordRequestEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.models.enums.PublicationStatusEnum;
import recepiesserver.recipesserver.repositories.PasswordRequestRepository;

@ContextConfiguration(classes = {PasswordRequestService.class})
@ExtendWith(SpringExtension.class)
class PasswordRequestServiceTest {
    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private PasswordRequestRepository passwordRequestRepository;

    @Autowired
    private PasswordRequestService passwordRequestService;

    @MockBean
    private UserService userService;

    @Test
    void testHandleForgottenPassword() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserByEmail((String) any())).thenReturn(ofResult);

        PasswordRequestEntity passwordRequestEntity = new PasswordRequestEntity();
        passwordRequestEntity.setCode("Code");
        passwordRequestEntity.setId(123L);
        passwordRequestEntity.setIssuedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        passwordRequestEntity.setIssuedByUser(1L);
        passwordRequestEntity.setPublicationStatusEnum(PublicationStatusEnum.PENDING);
        when(passwordRequestRepository.save((PasswordRequestEntity) any())).thenReturn(passwordRequestEntity);

        UserEmailDTO userEmailDTO = new UserEmailDTO();
        userEmailDTO.setEmail("jane.doe@example.org");
        assertEquals("janedoe", passwordRequestService.handleForgottenPassword(userEmailDTO).getUsername());
        verify(userService).findUserByEmail((String) any());
        verify(passwordRequestRepository).save((PasswordRequestEntity) any());
    }

    @Test
    void testHandleForgottenPasswordShouldThrowUponExpiredCode() {
        UserEntity userEntity = new UserEntity();
        userEntity.setAvatarUrl("https://example.org/example");
        userEntity.setBlocked(true);
        userEntity.setEmail("jane.doe@example.org");
        userEntity.setFavourites(new ArrayList<>());
        userEntity.setId(123L);
        userEntity.setIpAddresses(new HashSet<>());
        userEntity.setPassword("iloveyou");
        userEntity.setRoles(new ArrayList<>());
        userEntity.setUsername("janedoe");
        Optional<UserEntity> ofResult = Optional.of(userEntity);
        when(userService.findUserByEmail((String) any())).thenReturn(ofResult);
        when(passwordRequestRepository.save((PasswordRequestEntity) any()))
                .thenThrow(new ExpiredRequestCode("An error occurred"));

        UserEmailDTO userEmailDTO = new UserEmailDTO();
        userEmailDTO.setEmail("jane.doe@example.org");
        assertThrows(ExpiredRequestCode.class, () -> passwordRequestService.handleForgottenPassword(userEmailDTO));
        verify(userService).findUserByEmail((String) any());
        verify(passwordRequestRepository).save((PasswordRequestEntity) any());
    }

    @Test
    void testHandleForgottenPasswordShouldThrowUponInvalidUser() {
        when(userService.findUserByEmail((String) any())).thenReturn(Optional.empty());

        PasswordRequestEntity passwordRequestEntity = new PasswordRequestEntity();
        passwordRequestEntity.setCode("Code");
        passwordRequestEntity.setId(123L);
        passwordRequestEntity.setIssuedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        passwordRequestEntity.setIssuedByUser(1L);
        passwordRequestEntity.setPublicationStatusEnum(PublicationStatusEnum.PENDING);
        when(passwordRequestRepository.save((PasswordRequestEntity) any())).thenReturn(passwordRequestEntity);

        UserEmailDTO userEmailDTO = new UserEmailDTO();
        userEmailDTO.setEmail("jane.doe@example.org");
        assertThrows(UserNotFoundException.class, () -> passwordRequestService.handleForgottenPassword(userEmailDTO));
        verify(userService).findUserByEmail((String) any());
    }

    @Test
    void testResetPasswordShouldThrowUponExpiredCode() {
        PasswordRequestEntity passwordRequestEntity = new PasswordRequestEntity();
        passwordRequestEntity.setCode("Code");
        passwordRequestEntity.setId(123L);
        passwordRequestEntity.setIssuedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        passwordRequestEntity.setIssuedByUser(1L);
        passwordRequestEntity.setPublicationStatusEnum(PublicationStatusEnum.PENDING);
        Optional<PasswordRequestEntity> ofResult = Optional.of(passwordRequestEntity);
        when(passwordRequestRepository.findByCode((String) any())).thenReturn(ofResult);

        UserPasswordDTO userPasswordDTO = new UserPasswordDTO();
        userPasswordDTO.setPassword("iloveyou");
        assertThrows(ExpiredRequestCode.class, () -> passwordRequestService.resetPassword("Code", userPasswordDTO));
        verify(passwordRequestRepository).findByCode((String) any());
    }

    @Test
    void testResetPasswordShouldThrowUponInvalidCode() {
        when(passwordRequestRepository.findByCode((String) any())).thenReturn(Optional.empty());

        PasswordRequestEntity passwordRequestEntity = new PasswordRequestEntity();
        passwordRequestEntity.setCode("Code");
        passwordRequestEntity.setId(123L);
        passwordRequestEntity.setIssuedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        passwordRequestEntity.setIssuedByUser(1L);
        passwordRequestEntity.setPublicationStatusEnum(PublicationStatusEnum.PENDING);

        PasswordRequestEntity passwordRequestEntity1 = new PasswordRequestEntity();
        passwordRequestEntity1.setCode("Code");
        passwordRequestEntity1.setId(123L);
        passwordRequestEntity1.setIssuedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        passwordRequestEntity1.setIssuedByUser(1L);
        passwordRequestEntity1.setPublicationStatusEnum(PublicationStatusEnum.PENDING);

        PasswordRequestEntity passwordRequestEntity2 = new PasswordRequestEntity();
        passwordRequestEntity2.setCode("Code");
        passwordRequestEntity2.setId(123L);
        passwordRequestEntity2.setIssuedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        passwordRequestEntity2.setIssuedByUser(1L);
        passwordRequestEntity2.setPublicationStatusEnum(PublicationStatusEnum.PENDING);

        PasswordRequestEntity passwordRequestEntity3 = new PasswordRequestEntity();
        passwordRequestEntity3.setCode("Code");
        passwordRequestEntity3.setId(123L);
        passwordRequestEntity3.setIssuedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        passwordRequestEntity3.setIssuedByUser(1L);
        passwordRequestEntity3.setPublicationStatusEnum(PublicationStatusEnum.PENDING);
        PasswordRequestEntity passwordRequestEntity4 = mock(PasswordRequestEntity.class);
        when(passwordRequestEntity4.getIssuedAt()).thenReturn(LocalDateTime.of(1, 1, 1, 1, 1));
        when(passwordRequestEntity4.setCode((String) any())).thenReturn(passwordRequestEntity);
        when(passwordRequestEntity4.setIssuedAt((LocalDateTime) any())).thenReturn(passwordRequestEntity1);
        when(passwordRequestEntity4.setIssuedByUser((Long) any())).thenReturn(passwordRequestEntity2);
        when(passwordRequestEntity4.setPublicationStatusEnum((PublicationStatusEnum) any()))
                .thenReturn(passwordRequestEntity3);
        doNothing().when(passwordRequestEntity4).setId((Long) any());
        passwordRequestEntity4.setCode("Code");
        passwordRequestEntity4.setId(123L);
        passwordRequestEntity4.setIssuedAt(LocalDateTime.of(1, 1, 1, 1, 1));
        passwordRequestEntity4.setIssuedByUser(1L);
        passwordRequestEntity4.setPublicationStatusEnum(PublicationStatusEnum.PENDING);

        UserPasswordDTO userPasswordDTO = new UserPasswordDTO();
        userPasswordDTO.setPassword("iloveyou");
        assertThrows(InvalidRequestCode.class, () -> passwordRequestService.resetPassword("Code", userPasswordDTO));
        verify(passwordRequestRepository).findByCode((String) any());
        verify(passwordRequestEntity4).setCode((String) any());
        verify(passwordRequestEntity4).setIssuedAt((LocalDateTime) any());
        verify(passwordRequestEntity4).setIssuedByUser((Long) any());
        verify(passwordRequestEntity4).setPublicationStatusEnum((PublicationStatusEnum) any());
        verify(passwordRequestEntity4).setId((Long) any());
    }

    @Test
    void testCleanUpPasswordRequests() {
        when(passwordRequestRepository.findAll()).thenThrow(new InvalidRequestCode("An error occurred"));
        doThrow(new InvalidRequestCode("An error occurred")).when(passwordRequestRepository)
                .deleteAll((Iterable<PasswordRequestEntity>) any());
        assertThrows(InvalidRequestCode.class, () -> passwordRequestService.cleanUpPasswordRequests());
        verify(passwordRequestRepository).findAll();
    }
}

