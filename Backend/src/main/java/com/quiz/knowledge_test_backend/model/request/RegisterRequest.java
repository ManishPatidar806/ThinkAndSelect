package com.quiz.knowledge_test_backend.model.request;

import com.quiz.knowledge_test_backend.model.Enum.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
public class RegisterRequest {

    @NotBlank(message = "Full name must be valid")
    String fullname;
    @NotBlank(message = "Domain must be Valid")
    String domain;
    @NotBlank(message = "Email must be valid")
    @Email
    String email;
    @NotBlank(message = "Place name must be valid")
    String place;
    @NotBlank(message = "Password must be valid")
    String password;


    String description;


}
