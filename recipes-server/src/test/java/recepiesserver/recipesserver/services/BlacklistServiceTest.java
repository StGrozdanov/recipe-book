package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recepiesserver.recipesserver.events.BlockUserEvent;
import recepiesserver.recipesserver.events.UnblockUserEvent;
import recepiesserver.recipesserver.exceptions.blacklistExceptions.BlacklistAlreadyContainsIPException;
import recepiesserver.recipesserver.exceptions.blacklistExceptions.IpNotFoundException;
import recepiesserver.recipesserver.models.entities.BlacklistEntity;
import recepiesserver.recipesserver.repositories.BlacklistRepository;

@ContextConfiguration(classes = {BlacklistService.class})
@ExtendWith(SpringExtension.class)
class BlacklistServiceTest {
    @MockBean
    private BlacklistRepository blacklistRepository;

    @Autowired
    private BlacklistService blacklistService;

    @Test
    void testAddToBlacklist() {
        BlacklistEntity blacklistEntity = new BlacklistEntity();
        blacklistEntity.setId(123L);
        blacklistEntity.setIpAddress("42 Main St");
        blacklistEntity.setReason("Just cause");
        when(blacklistRepository.save((BlacklistEntity) any())).thenReturn(blacklistEntity);

        HashSet<String> stringSet = new HashSet<>();
        stringSet.add("foo");
        blacklistService.addToBlacklist(new BlockUserEvent("Source", stringSet, "Just cause"));
        verify(blacklistRepository).save((BlacklistEntity) any());
    }

    @Test
    void testAddToBlacklistShouldThrowUponAlreadyExistingIpList() {
        BlacklistEntity blacklistEntity = new BlacklistEntity();
        blacklistEntity.setId(123L);
        blacklistEntity.setIpAddress("42 Main St");
        blacklistEntity.setReason("Just cause");
        when(blacklistRepository.save((BlacklistEntity) any())).thenReturn(blacklistEntity);
        BlockUserEvent blockUserEvent = mock(BlockUserEvent.class);
        when(blockUserEvent.getIpAddresses()).thenThrow(new DataIntegrityViolationException("Msg"));
        assertThrows(BlacklistAlreadyContainsIPException.class, () -> blacklistService.addToBlacklist(blockUserEvent));
        verify(blockUserEvent).getIpAddresses();
    }

    @Test
    void testRemoveFromBlacklist() {
        BlacklistEntity blacklistEntity = new BlacklistEntity();
        blacklistEntity.setId(123L);
        blacklistEntity.setIpAddress("42 Main St");
        blacklistEntity.setReason("Just cause");
        Optional<BlacklistEntity> ofResult = Optional.of(blacklistEntity);
        doNothing().when(blacklistRepository).delete((BlacklistEntity) any());
        when(blacklistRepository.findByIpAddress((String) any())).thenReturn(ofResult);

        HashSet<String> stringSet = new HashSet<>();
        stringSet.add("foo");
        blacklistService.removeFromBlacklist(new UnblockUserEvent("Source", stringSet));
        verify(blacklistRepository).findByIpAddress((String) any());
        verify(blacklistRepository).delete((BlacklistEntity) any());
    }

    @Test
    void testRemoveFromBlacklistShouldThrow() {
        BlacklistEntity blacklistEntity = new BlacklistEntity();
        blacklistEntity.setId(123L);
        blacklistEntity.setIpAddress("42 Main St");
        blacklistEntity.setReason("Just cause");
        Optional<BlacklistEntity> ofResult = Optional.of(blacklistEntity);
        doThrow(new DataIntegrityViolationException("Msg")).when(blacklistRepository).delete((BlacklistEntity) any());
        when(blacklistRepository.findByIpAddress((String) any())).thenReturn(ofResult);

        HashSet<String> stringSet = new HashSet<>();
        stringSet.add("foo");
        assertThrows(DataIntegrityViolationException.class,
                () -> blacklistService.removeFromBlacklist(new UnblockUserEvent("Source", stringSet)));
        verify(blacklistRepository).findByIpAddress((String) any());
        verify(blacklistRepository).delete((BlacklistEntity) any());
    }

    @Test
    void testRemoveFromBlacklistShouldThrowUponNonExistentIpProvided() {
        doNothing().when(blacklistRepository).delete((BlacklistEntity) any());
        when(blacklistRepository.findByIpAddress((String) any())).thenReturn(Optional.empty());

        HashSet<String> stringSet = new HashSet<>();
        stringSet.add("foo");
        assertThrows(IpNotFoundException.class,
                () -> blacklistService.removeFromBlacklist(new UnblockUserEvent("Source", stringSet)));
        verify(blacklistRepository).findByIpAddress((String) any());
    }

    @Test
    void testBlacklistContainsIpReturnsTrue() {
        when(blacklistRepository.existsByIpAddress((String) any())).thenReturn(true);
        assertTrue(blacklistService.blacklistContainsIp("127.0.0.1"));
        verify(blacklistRepository).existsByIpAddress((String) any());
    }

    @Test
    void testBlacklistContainsIpReturnsFalse() {
        when(blacklistRepository.existsByIpAddress((String) any())).thenReturn(false);
        assertFalse(blacklistService.blacklistContainsIp("127.0.0.1"));
        verify(blacklistRepository).existsByIpAddress((String) any());
    }

    @Test
    void testBlacklistContainsIpShouldThrow() {
        when(blacklistRepository.existsByIpAddress((String) any())).thenThrow(new DataIntegrityViolationException("Msg"));
        assertThrows(DataIntegrityViolationException.class, () -> blacklistService.blacklistContainsIp("127.0.0.1"));
        verify(blacklistRepository).existsByIpAddress((String) any());
    }

    @Test
    void testGetBlockedForReason() {
        BlacklistEntity blacklistEntity = new BlacklistEntity();
        blacklistEntity.setId(123L);
        blacklistEntity.setIpAddress("42 Main St");
        blacklistEntity.setReason("Just cause");
        Optional<BlacklistEntity> ofResult = Optional.of(blacklistEntity);
        when(blacklistRepository.findByIpAddress((String) any())).thenReturn(ofResult);
        assertEquals("Just cause", blacklistService.getBlockedForReason("127.0.0.1"));
        verify(blacklistRepository).findByIpAddress((String) any());
    }

    @Test
    void testGetBlockedForReasonShouldThrowUponInvalidIpProvided() {
        when(blacklistRepository.findByIpAddress((String) any())).thenReturn(Optional.empty());
        assertThrows(IpNotFoundException.class, () -> blacklistService.getBlockedForReason("127.0.0.1"));
        verify(blacklistRepository).findByIpAddress((String) any());
    }

    @Test
    void testGetBlockedForReasonShouldThrowUponProvidedNonExistentIp() {
        when(blacklistRepository.findByIpAddress((String) any())).thenThrow(new DataIntegrityViolationException(
                "One of the requested user IP to remove from the blacklist is non existent."));
        assertThrows(DataIntegrityViolationException.class, () -> blacklistService.getBlockedForReason("127.0.0.1"));
        verify(blacklistRepository).findByIpAddress((String) any());
    }
}

