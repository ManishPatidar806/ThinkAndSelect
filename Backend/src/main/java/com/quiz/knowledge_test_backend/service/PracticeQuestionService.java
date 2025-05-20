package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.Exception.ResourceNotFoundException;
import com.quiz.knowledge_test_backend.model.entity.PracticeQuestion;
import com.quiz.knowledge_test_backend.model.response.AnswerResponse;
import com.quiz.knowledge_test_backend.model.response.Question;
import com.quiz.knowledge_test_backend.model.response.QuestionsResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PracticeQuestionService {
    public QuestionsResponse getPracticeQuestion(String type) throws ResourceNotFoundException;
    public AnswerResponse checkPracticeQuestion(String answer, Long id) throws ResourceNotFoundException;
    public PracticeQuestion savePracticeQuestion(PracticeQuestion question);
    public List<PracticeQuestion> saveAllPracticeQuestion(List<PracticeQuestion> question);


}
