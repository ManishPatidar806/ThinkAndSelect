package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.entity.PracticeQuestion;
import com.quiz.knowledge_test_backend.response.QuestionResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PracticeQuestionService {
    public List<QuestionResponse> getPracticeQuestion(String type);
    public boolean checkPracticeQuestion(String answer, Long id);
    public PracticeQuestion savePracticeQuestion(PracticeQuestion question);
    public List<PracticeQuestion> saveAllPracticeQuestion(List<PracticeQuestion> question);


}
