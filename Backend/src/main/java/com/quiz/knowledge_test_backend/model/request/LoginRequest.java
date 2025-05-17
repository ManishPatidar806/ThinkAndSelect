package com.quiz.knowledge_test_backend.model.request;

import com.quiz.knowledge_test_backend.model.Enum.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginRequest {
    @NotBlank(message = "email must be Valid")
    private  String email;
    @NotBlank(message = "password must be Valid")
    private String password;
}
