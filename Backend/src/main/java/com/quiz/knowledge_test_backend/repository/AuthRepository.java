package com.quiz.knowledge_test_backend.repository;

import com.quiz.knowledge_test_backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
}
