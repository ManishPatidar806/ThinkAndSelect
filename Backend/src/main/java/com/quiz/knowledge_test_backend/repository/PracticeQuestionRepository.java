package com.quiz.knowledge_test_backend.repository;

import com.quiz.knowledge_test_backend.model.entity.PracticeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticeQuestionRepository extends JpaRepository<PracticeQuestion, Long> {

    @Query(value = "SELECT * FROM practice_question WHERE type=:type ORDER BY RAND() LIMIT 10 ", nativeQuery = true)
    List<PracticeQuestion> findPracticeQuestionBy(@Param("type") String type);



}


