package recepiesserver.recipesserver.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import recepiesserver.recipesserver.interceptors.IpBlacklistInterceptor;
import recepiesserver.recipesserver.services.BlacklistService;

@Configuration
public class InterceptorConfiguration implements WebMvcConfigurer {
    private final BlacklistService blacklistService;

    public InterceptorConfiguration(BlacklistService blacklistService) {
        this.blacklistService = blacklistService;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new IpBlacklistInterceptor(blacklistService));
    }
}
