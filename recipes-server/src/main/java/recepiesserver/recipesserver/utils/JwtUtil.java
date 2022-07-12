package recepiesserver.recipesserver.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.*;

import static java.util.Arrays.stream;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public DecodedJWT decodeToken(String token) throws Error {
        Algorithm algorithm = getTokenAlgorithm();
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }

    public String extractUsername(String authorizationHeader) {
        String token = getTokenValue(authorizationHeader);
        DecodedJWT decodedJWT = decodeToken(token);
        return decodedJWT.getSubject();
    }

    public Collection<SimpleGrantedAuthority> extractAuthorities(String authorizationHeader) {
        String token = getTokenValue(authorizationHeader);
        DecodedJWT decodedJWT = decodeToken(token);

        String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));

        return authorities;
    }

    public Map<String, String> generateSessionAndRefreshTokens(UserDetails userDetails) {
        Map<String, String> tokens = new HashMap<>();

        tokens.put("session_token", createAccessToken(userDetails));
        tokens.put("refresh_token", createRefreshToken(userDetails));

        return tokens;
    }

    public String getTokenValue(String authorizationHeader) {
        return authorizationHeader.substring("Bearer ".length());
    }

    public boolean userIsResourceOwner(String authorizationHeader, String resourceOwnerUsername) {
        return this.extractUsername(authorizationHeader).equals(resourceOwnerUsername);
    }

    public String generateSessionToken(UserDetails user) {
        return this.createAccessToken(user);
    }

    private String createAccessToken(UserDetails user) {
        Algorithm algorithm = getTokenAlgorithm();

        return JWT
                .create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000)) //expires after 30 min
                .withClaim("roles", user
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList())
                .sign(algorithm);
    }

    private String createRefreshToken(UserDetails user) {
        Algorithm algorithm = getTokenAlgorithm();

        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 43830L * 60 * 1000)) //expires after a month
                .sign(algorithm);
    }

    private Algorithm getTokenAlgorithm() {
        return Algorithm.HMAC256(SECRET_KEY.getBytes());
    }
}
