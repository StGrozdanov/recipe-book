package recepiesserver.recipesserver.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {JwtUtil.class})
@ExtendWith(SpringExtension.class)
class JwtUtilTest {
    @Autowired
    private JwtUtil jwtUtil;

    @Test
    void testGenerateSessionAndRefreshTokens() {
        assertEquals(2, jwtUtil.generateSessionAndRefreshTokens(new User("janedoe", "iloveyou", new ArrayList<>())).size());
    }

    @Test
    void testGenerateSessionAndRefreshTokens2() {
        ArrayList<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
        grantedAuthorityList.add(new SimpleGrantedAuthority("session_token"));
        assertEquals(2,
                jwtUtil.generateSessionAndRefreshTokens(new User("janedoe", "iloveyou", grantedAuthorityList)).size());
    }

    @Test
    void testGetTokenValue() {
        assertEquals("", jwtUtil.getTokenValue("JaneDoe"));
    }
}

