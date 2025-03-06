package com.quiz.knowledge_test_backend.repository;

import com.quiz.knowledge_test_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
