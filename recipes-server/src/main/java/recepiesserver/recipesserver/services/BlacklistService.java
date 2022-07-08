package recepiesserver.recipesserver.services;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.entities.BlacklistEntity;
import recepiesserver.recipesserver.repositories.BlacklistRepository;

import java.util.Optional;
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
            //TODO: Make it intelligent ...
            System.out.println("Blacklist already contains one of the ip addresses you attempt to block.");
        }
    }

    public void removeFromBlacklist(Set<String> ipAddresses) {
        try {
            ipAddresses.forEach(ip -> {
                Optional<BlacklistEntity> byIpAddress = this.blacklistRepository.findByIpAddress(ip);
                if (byIpAddress.isPresent()) {
                    BlacklistEntity blacklistedIp = byIpAddress.get();
                    this.blacklistRepository.delete(blacklistedIp);
                }
                //TODO: throw
            });
        } catch (DataIntegrityViolationException e) {
            //TODO: Make it intelligent ...
            System.out.println("Blacklist already contains one of the ip addresses you attempt to block.");
        }
    }

    public boolean blacklistContainsIp(String ip) {
        return this.blacklistRepository.existsByIpAddress(ip);
    }

    public String getBlockedForReason(String ip) {
        Optional<BlacklistEntity> byIpAddress = this.blacklistRepository.findByIpAddress(ip);
        if (byIpAddress.isPresent()) {
            BlacklistEntity blacklistEntity = byIpAddress.get();
            return blacklistEntity.getReason();
        }
        //TODO: THROW
        return null;
    }
}
