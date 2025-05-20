package com.quiz.knowledge_test_backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean
    ModelMapper MapperConfig(){
        return new ModelMapper();
    }
}
