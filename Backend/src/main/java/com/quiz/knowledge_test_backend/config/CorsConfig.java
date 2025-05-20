//package com.quiz.knowledge_test_backend.config;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
//@Configuration
//public class CorsConfig {
//
//    private static final Logger logger = LoggerFactory.getLogger(CorsConfig.class);
//
//    @Value("${Frontend.Url}")
//    private String frontendUrl;
//
//    @Bean
//    public CorsConfigurationSource corsConfigurer() {
//        logger.info("Frontend URL: {}", frontendUrl);
//
//        CorsConfiguration cors = new CorsConfiguration();
//        cors.setAllowedOrigins(List.of(frontendUrl));
//        cors.setAllowedHeaders(List.of("*"));
//        cors.setAllowedMethods(List.of("GET", "PUT", "POST", "DELETE", "OPTIONS"));
//        cors.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", cors);
//        return source;
//    }
//}
