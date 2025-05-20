package com.quiz.knowledge_test_backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class QuestionsResponse {
    private List<Question> questions;
    private int count;
    private String message;
    private boolean status;

}
