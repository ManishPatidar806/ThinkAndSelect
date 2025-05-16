package com.quiz.knowledge_test_backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnswerResponse {

    private String message;
    private boolean answer;
    private boolean status;


}
