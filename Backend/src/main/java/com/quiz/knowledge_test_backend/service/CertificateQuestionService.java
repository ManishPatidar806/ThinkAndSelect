package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.Exception.ResourceNotFoundException;
import com.quiz.knowledge_test_backend.model.entity.CertificateQuestion;
import com.quiz.knowledge_test_backend.model.response.AnswerResponse;
import com.quiz.knowledge_test_backend.model.response.Question;
import com.quiz.knowledge_test_backend.model.response.QuestionsResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CertificateQuestionService {

    public QuestionsResponse getCertificateQuestion(String type) throws ResourceNotFoundException;

    public AnswerResponse checkCertificateQuestion(String answer, Long id) throws ResourceNotFoundException;

    public CertificateQuestion saveCertificateQuestion(CertificateQuestion question);
    public List<CertificateQuestion> saveAllCertificateQuestion(List<CertificateQuestion> question);
}
