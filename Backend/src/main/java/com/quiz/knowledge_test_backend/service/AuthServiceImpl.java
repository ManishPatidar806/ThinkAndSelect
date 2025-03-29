package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.Exception.CommonException;
import com.quiz.knowledge_test_backend.entity.User;
import com.quiz.knowledge_test_backend.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Override
    public User signUp(User user) throws CommonException {
        User isUserExist = authRepository.findByEmail(user.getEmail());
        if (isUserExist != null) {
            throw new CommonException("User is Already Exist!");
        }
        return authRepository.save(user);

    }

    @Override
    public User login(String email, String password) throws CommonException {
        User isUserExist = authRepository.findByEmail(email);
        if (isUserExist == null) {
            throw new CommonException("User Not Found!");
        }
        if (!password.equals(isUserExist.getPassword())) {
            throw new CommonException("Password is incorrect!");
        }
        return isUserExist;

    }
}
