package recepiesserver.recipesserver.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import recepiesserver.recipesserver.exceptions.InvalidTokenException;
import recepiesserver.recipesserver.utils.JwtUtil;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class AuthorizationFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    public AuthorizationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String username = this.jwtUtil.extractUsername(authorizationHeader);

                Collection<SimpleGrantedAuthority> authorities = this.jwtUtil
                        .extractAuthorities(authorizationHeader);

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(username, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                filterChain.doFilter(request, response);
            }
            catch (NullPointerException e) {
                filterChain.doFilter(request, response);
            }
            catch (Exception e) {
                response.sendError(401, ExceptionMessages.INVALID_TOKEN);
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
