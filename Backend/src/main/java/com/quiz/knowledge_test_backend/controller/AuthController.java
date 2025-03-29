package com.quiz.knowledge_test_backend.controller;

import com.quiz.knowledge_test_backend.Exception.CommonException;
import com.quiz.knowledge_test_backend.config.JwtConfig;
import com.quiz.knowledge_test_backend.entity.User;

import com.quiz.knowledge_test_backend.response.AuthResponse;

import com.quiz.knowledge_test_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

@Autowired
private AuthService authService;

@Autowired
private JwtConfig jwtConfig;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User user) throws Exception {
        User user1 = authService.signUp(user);
        String token = jwtConfig.generatToken(user1.getEmail());
          AuthResponse response = new AuthResponse();
          response.setStatus(true);
          response.setJwt(token);
         response.setMessage("Register Successfully..........");
         response.setFullname(user.getFullname());
         response.setPlace(user.getPlace());
         response.setDomain(user.getDomain());
         response.setDescription(user.getDescription());
               return new ResponseEntity<>(response , HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {
       String email = user.getEmail();
       String password = user.getPassword();
       if (email==null||password==null){
           throw new CommonException("Enter valid email or password");
       }
       User user1 = authService.login(email,password);
            String token =jwtConfig.generatToken(email);
       AuthResponse response = new AuthResponse();
            response.setStatus(true);
            response.setMessage("Login Successfully............");
            response.setJwt(token);
            response.setFullname(user1 .getFullname());
            response.setPlace(user1 .getPlace());
            response.setDomain(user1 .getDomain());
            response.setDescription(user1 .getDescription());

        return  new ResponseEntity<>(response ,HttpStatus.ACCEPTED);
    }




}
