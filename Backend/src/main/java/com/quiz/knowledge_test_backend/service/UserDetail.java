package com.quiz.knowledge_test_backend.service;


import com.quiz.knowledge_test_backend.model.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


public class UserDetail implements UserDetails {


 private final User user;

    public UserDetail(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }
    public String getFullName(){
        System.out.println(user.toString());
        return user.getFullname();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }


}
