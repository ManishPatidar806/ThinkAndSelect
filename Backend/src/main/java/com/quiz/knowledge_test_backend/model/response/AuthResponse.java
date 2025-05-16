package com.quiz.knowledge_test_backend.model.response;

import lombok.Data;

@Data
public class AuthResponse {
   private String jwt;
    private String message;
    private boolean status;
    private String fullname;
    private String domain;
    private String place;
    private String description;

}
