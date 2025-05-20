package com.quiz.knowledge_test_backend.controller;

import com.quiz.knowledge_test_backend.model.request.LoginRequest;
import com.quiz.knowledge_test_backend.model.request.RegisterRequest;
import com.quiz.knowledge_test_backend.model.response.AuthResponse;
import com.quiz.knowledge_test_backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/user")
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;

    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid RegisterRequest user) throws Exception {
        AuthResponse response = authService.signUp(user);
        return new ResponseEntity<>(response, HttpStatus.valueOf(201));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) throws Exception {
        AuthResponse response = authService.login(loginRequest);
        return new ResponseEntity<>(response, HttpStatus.valueOf(200));
    }




}
