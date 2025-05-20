package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.model.entity.User;
import com.quiz.knowledge_test_backend.repository.AuthRepository;
import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Data
public class UserDetailService implements UserDetailsService {

    private final AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = authRepository.findByEmail(username);
        user.orElseThrow(()->new UsernameNotFoundException("UserName not found"));
        return new UserDetail(user.get());
    }
}
