package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.Exception.CommonException;
import com.quiz.knowledge_test_backend.model.entity.User;
import com.quiz.knowledge_test_backend.model.request.LoginRequest;
import com.quiz.knowledge_test_backend.model.request.RegisterRequest;
import com.quiz.knowledge_test_backend.model.response.AuthResponse;

public interface AuthService {
    public AuthResponse signUp(RegisterRequest registerRequest) throws CommonException;
    public AuthResponse login(LoginRequest loginRequest) throws CommonException;
}
