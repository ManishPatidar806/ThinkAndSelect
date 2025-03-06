package com.quiz.knowledge_test_backend.controller;

import com.quiz.knowledge_test_backend.AuthHelper.AuthHelper;
import com.quiz.knowledge_test_backend.entity.User;
import com.quiz.knowledge_test_backend.repository.AuthRepository;
import com.quiz.knowledge_test_backend.response.AuthResponse;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthRepository authRepository;


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signin(@RequestBody User user) throws Exception {

        User isexist =authRepository.findByEmail(user.getEmail());

        if(isexist!=null){
            AuthResponse response = new AuthResponse();
            response.setMessage("Email is already Existed");
            return new ResponseEntity<>(response , HttpStatus.NOT_FOUND);
        }

//        Confirm password recheck
        User newuser = new User();
        newuser.setFullname(user.getFullname());
        newuser.setEmail(user.getEmail());
        newuser.setDomain(user.getDomain());
        newuser.setPlace(user.getPlace());
        newuser.setDescription(user.getDescription());
        newuser.setPassword(user.getPassword());
        User usersaved = authRepository.save(newuser);
        AuthHelper authHelper = new AuthHelper();
        String token = authHelper.generatToken(usersaved.getEmail());

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

        System.out.println(email);
        System.out.println(password);

       if (email==null||password==null){
           throw new Exception("Enter valid email or password");
       }

        User isexist =authRepository.findByEmail(email);
        AuthResponse response = new AuthResponse();
        if(isexist!=null) {

            System.out.println(isexist.getPassword());
            if (!password.equals(isexist.getPassword())) {
                throw new Exception("Password is incorrect!");
            }

            AuthHelper authHelper = new AuthHelper();
            String token = authHelper.generatToken(email);

            response.setStatus(true);
            response.setMessage("Login Successfully............");
            response.setJwt(token);
            response.setFullname(isexist.getFullname());
            response.setPlace(isexist.getPlace());
            response.setDomain(isexist.getDomain());
            response.setDescription(isexist.getDescription());
        }
        return  new ResponseEntity<>(response ,HttpStatus.ACCEPTED);
    }

    @GetMapping("/secure")
    public String Secure(@RequestHeader(value = "Authorization") String authorizationHeader) throws Exception {

        if (authorizationHeader!=null&&authorizationHeader.startsWith("Bearer ")){
            String token = authorizationHeader.substring(7);
                AuthHelper authHelper = new AuthHelper();
            if(authHelper.validateToken(token)){
                return "Api is Secure";
            }else {
                return "Api is not Secure";
            }
        }
        return "not found any thing";
    }



}
