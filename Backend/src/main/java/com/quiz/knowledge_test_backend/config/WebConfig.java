package com.quiz.knowledge_test_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebConfig {

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

    httpSecurity.csrf(csrf->csrf.disable()).authorizeHttpRequests(req->req.requestMatchers("/**")
            .permitAll().anyRequest().authenticated());

    return httpSecurity.build();
}





}
