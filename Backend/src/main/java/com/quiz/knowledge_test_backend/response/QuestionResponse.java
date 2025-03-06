package com.quiz.knowledge_test_backend.response;

import lombok.Data;

import java.util.List;

@Data
public class QuestionResponse {
    private  Long questionId;
    private  String question;
    private  String type;
    private List<String> options;
}
