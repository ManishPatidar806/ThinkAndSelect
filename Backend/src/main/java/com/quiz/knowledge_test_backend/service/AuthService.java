package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.Exception.CommonException;
import com.quiz.knowledge_test_backend.entity.User;

public interface AuthService {
    public User signUp(User user) throws CommonException;
    public User login(String email , String password) throws CommonException;
}
