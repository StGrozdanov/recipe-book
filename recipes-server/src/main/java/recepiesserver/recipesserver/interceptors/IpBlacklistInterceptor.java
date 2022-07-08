package recepiesserver.recipesserver.interceptors;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.spi.ErrorMessage;
import org.springframework.web.servlet.HandlerInterceptor;
import recepiesserver.recipesserver.services.BlacklistService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class IpBlacklistInterceptor implements HandlerInterceptor {
    private final BlacklistService blacklistService;

    public IpBlacklistInterceptor(BlacklistService blacklistService) {
        this.blacklistService = blacklistService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ip = request.getHeader("X-Forwarded-For") == null
                                                                ? request.getRemoteAddr()
                                                                : request.getHeader("X-Forwarded-For");
        if (this.blacklistService.blacklistContainsIp(ip)) {
            String reason = this.blacklistService.getBlockedForReason(ip);

            ObjectMapper mapper = new ObjectMapper();

            ErrorMessage msg = new ErrorMessage(reason);

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(mapper.writeValueAsString(msg));

            return false;
        }
        return true;
    }
}