package com.quiz.knowledge_test_backend.model.request;

import com.quiz.knowledge_test_backend.model.Enum.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginRequest {
    private  String email;
    private String password;
    private Role role;
}
