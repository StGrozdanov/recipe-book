package recepiesserver.recipesserver.services;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.exceptions.blacklistExceptions.BlacklistAlreadyContainsIPException;
import recepiesserver.recipesserver.exceptions.blacklistExceptions.IpNotFoundException;
import recepiesserver.recipesserver.models.entities.BlacklistEntity;
import recepiesserver.recipesserver.repositories.BlacklistRepository;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;

import java.util.Set;

@Service
public class BlacklistService {
    private final BlacklistRepository blacklistRepository;

    public BlacklistService(BlacklistRepository blacklistRepository) {
        this.blacklistRepository = blacklistRepository;
    }

    public void addToBlacklist(Set<String> ipAddresses, String reason) {
        try {
            ipAddresses.forEach(ip -> this.blacklistRepository.save(new BlacklistEntity(ip, reason)));
        } catch (DataIntegrityViolationException e) {
            throw new BlacklistAlreadyContainsIPException(ExceptionMessages.BLACKLIST_ALREADY_CONTAINS_IP);
        }
    }

    public void removeFromBlacklist(Set<String> ipAddresses) {
        ipAddresses.forEach(ip -> {
            BlacklistEntity blacklistedIp = this.getBlacklistedEntityByIpAddress(ip);
            this.blacklistRepository.delete(blacklistedIp);
        });
    }

    public boolean blacklistContainsIp(String ip) {
        return this.blacklistRepository.existsByIpAddress(ip);
    }

    public String getBlockedForReason(String ip) {
        BlacklistEntity blacklistEntity = this.getBlacklistedEntityByIpAddress(ip);
        return blacklistEntity.getReason();
    }

    private BlacklistEntity getBlacklistedEntityByIpAddress(String ip) {
        return this.blacklistRepository
                .findByIpAddress(ip)
                .orElseThrow(() -> new IpNotFoundException(ExceptionMessages.BLACKLIST_DOES_NOT_CONTAIN_IP));
    }
}