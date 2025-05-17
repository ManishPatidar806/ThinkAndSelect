package com.quiz.knowledge_test_backend.model.entity;

import com.quiz.knowledge_test_backend.model.Enum.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String fullname;
    @Column(nullable = false)
    String domain;
    @Column(nullable = false)
    String email;
    @Column(nullable = false)
    String place;
    @Column(nullable = false)
    String password;

    String description;



}
