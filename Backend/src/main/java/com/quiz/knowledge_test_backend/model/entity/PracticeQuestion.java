package com.quiz.knowledge_test_backend.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PracticeQuestion {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(nullable = false)
private  Long practiceQuestionId;
    @Column(nullable = false)
private  String question;
    @Column(nullable = false)
private  String answer;
    @Column(nullable = false)
    private  String type;


    @Column(nullable = false)
    private  String optionA;
    @Column(nullable = false)
    private  String optionB;
    @Column(nullable = false)
    private  String optionC;
    @Column(nullable = false)
    private  String optionD;
}
