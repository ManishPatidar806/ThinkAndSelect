package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.Exception.CommonException;
import com.quiz.knowledge_test_backend.model.entity.User;
import com.quiz.knowledge_test_backend.model.request.LoginRequest;
import com.quiz.knowledge_test_backend.model.request.RegisterRequest;
import com.quiz.knowledge_test_backend.model.response.AuthResponse;
import com.quiz.knowledge_test_backend.repository.AuthRepository;
import com.quiz.knowledge_test_backend.utility.JwtConfig;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {


    private final AuthRepository authRepository;

    private final JwtConfig jwtConfig;

    private final ModelMapper mapper;

    public AuthServiceImpl(AuthRepository authRepository, JwtConfig jwtConfig, ModelMapper mapper) {
        this.authRepository = authRepository;
        this.jwtConfig = jwtConfig;
        this.mapper = mapper;
    }

    @Override
    public AuthResponse signUp(RegisterRequest request) throws CommonException {
        Optional<User> isUserExist = authRepository.findByEmail(request.getEmail());
        if (isUserExist.isPresent()) {
            throw new CommonException("User already exists!");
        }
        User user = mapper.map(request, User.class);
        User save = authRepository.save(user);
        String token= jwtConfig.generateToken(save.getEmail());

        AuthResponse response = mapper.map(save, AuthResponse.class);
        response.setJwt(token);
        response.setStatus(true);
        response.setMessage("Registration Successfully");
        return response;


    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) throws CommonException {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        Optional<User> isUserExist = authRepository.findByEmail(email);
        isUserExist.orElseThrow(() -> new CommonException("User not found"));
        if (!password.equals(isUserExist.get().getPassword())) {
            throw new CommonException("Password is incorrect!");
        }
        String token= jwtConfig.generateToken(email);

        AuthResponse response = mapper.map(isUserExist.get(), AuthResponse.class);
        response.setJwt(token);
        response.setStatus(true);
        response.setMessage("Login Successfully");
        return response;
    }
}
