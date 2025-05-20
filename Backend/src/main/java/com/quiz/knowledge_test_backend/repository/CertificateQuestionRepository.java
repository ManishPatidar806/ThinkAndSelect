package com.quiz.knowledge_test_backend.repository;

import com.quiz.knowledge_test_backend.model.entity.CertificateQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CertificateQuestionRepository  extends JpaRepository<CertificateQuestion , Long> {


    @Query(value = "SELECT * FROM certificate_question WHERE type=:type ORDER BY RAND() LIMIT 20 ", nativeQuery = true)
    List<CertificateQuestion> findCertificateQuestion(@Param("type") String type);



}
