package recepiesserver.recipesserver.services;

import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.repositories.UserRepository;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public Optional<UserEntity> findUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public Optional<UserEntity> findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public Optional<UserEntity> findUserById(Long id) {
        return this.userRepository.findById(id);
    }
}
