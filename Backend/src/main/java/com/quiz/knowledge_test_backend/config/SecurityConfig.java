package com.quiz.knowledge_test_backend.config;


import com.quiz.knowledge_test_backend.utility.JwtFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
    private final JwtFilter jwtFilter;

    SecurityConfig(JwtFilter jwtFilter){
        this.jwtFilter=jwtFilter;
    }



    @Value("${Frontend.Url}")
    private String frontendUrl;

    @Bean
    public CorsConfigurationSource corsConfigure() {
        logger.info("Frontend URL: {}", frontendUrl);

        CorsConfiguration cors = new CorsConfiguration();
        cors.setAllowedOrigins(List.of(frontendUrl));
        cors.setAllowedHeaders(List.of("*"));
        cors.setAllowedMethods(List.of("GET", "PUT", "POST", "DELETE", "OPTIONS"));
        cors.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return  httpSecurity
                .csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(http -> http.requestMatchers("/v1/api/user/signin", "/v1/api/user/signup").permitAll().anyRequest().authenticated()).cors(cors -> cors.configurationSource(corsConfigure()))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).
                build();


    }
}
