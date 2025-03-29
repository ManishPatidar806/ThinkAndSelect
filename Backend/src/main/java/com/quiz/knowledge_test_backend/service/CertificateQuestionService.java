package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.entity.CertificateQuestion;
import com.quiz.knowledge_test_backend.response.QuestionResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CertificateQuestionService {

    public List<QuestionResponse> getCertificateQuestion(String type);

    public boolean checkCertificateQuestion(String answer, Long id);

    public CertificateQuestion saveCertificateQuestion(CertificateQuestion question);
    public List<CertificateQuestion> saveAllCertificateQuestion(List<CertificateQuestion> question);
}
