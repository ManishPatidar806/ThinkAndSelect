package com.quiz.knowledge_test_backend.controller;


import com.quiz.knowledge_test_backend.config.JwtConfig;
import com.quiz.knowledge_test_backend.entity.CertificateQuestion;
import com.quiz.knowledge_test_backend.entity.PracticeQuestion;
import com.quiz.knowledge_test_backend.response.QuestionResponse;
import com.quiz.knowledge_test_backend.service.CertificateQuestionService;
import com.quiz.knowledge_test_backend.service.PracticeQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/quiz")
@RestController
public class QuestionController {

    @Autowired
    private CertificateQuestionService certificateQuestionService;

    @Autowired
    private PracticeQuestionService practiceQuestionService;

    @Autowired
    private JwtConfig jwtConfig;

    /*
     * Api for Practice Quiz
     */
    @GetMapping("/practicequestion")
    public List<QuestionResponse> getAllQuestion(@RequestHeader(value = "Authorization") String authorizationHeader,
                                                 @RequestParam("type") String type) throws Exception {
        List<QuestionResponse> list = List.of();
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            if (jwtConfig.validateToken(token)) {
                list = practiceQuestionService.getPracticeQuestion(type);
                return list;
            }
        }
        return list;
    }

    @GetMapping("/checkpracticeanswer")
    public boolean checkPracticeAnswer(@RequestHeader(value = "Authorization") String authorization, @RequestParam("answer") String answer, @RequestParam("id") Long temId) throws Exception {
        if (authorization != null && authorization.startsWith("Bearer ")) {
            String token = authorization.substring(7);
            if (jwtConfig.validateToken(token)) {
                return practiceQuestionService.checkPracticeQuestion(answer, temId);

            }
        }
        return false;
    }


    @GetMapping(value = "/savepracticequestion", consumes = "application/json", produces = "application/json")
    public PracticeQuestion saveQuestion(@RequestBody PracticeQuestion question) {
        return practiceQuestionService.savePracticeQuestion(question);

    }

    @PostMapping(value = "/saveallpracticequestion", produces = "application/json", consumes = "application/json")
    public List<PracticeQuestion> saveAllPracticeQuestion(@RequestBody List<PracticeQuestion> questionList) {
        return practiceQuestionService.saveAllPracticeQuestion(questionList);

    }


    /*
     * for Certificate Question
     * */
    @GetMapping("/certificatequiz")
    public List<QuestionResponse> getAll(@RequestHeader(value = "Authorization") String autherHeader,
                                         @RequestParam("type") String type) throws Exception {
        List<QuestionResponse> list = List.of();

        if (autherHeader != null && autherHeader.startsWith("Bearer ")) {
            String token = autherHeader.substring(7);

            if (jwtConfig.validateToken(token)) {
                list = certificateQuestionService.getCertificateQuestion(type);
                return list;
            }
        }
        return list;

    }

    @GetMapping("/checkcertificateanswer")
    public boolean checkCertificateAnswer(@RequestHeader(value = "Authorization") String authorization, @RequestParam("answer") String answer, @RequestParam("id") Long temId) throws Exception {
        if (authorization != null && authorization.startsWith("Bearer ")) {
            String token = authorization.substring(7);
            if (jwtConfig.validateToken(token)) {
                Long id = temId;
                return certificateQuestionService.checkCertificateQuestion(answer, id);

            }
        }
        return false;
    }


    @PostMapping(value = "/savecertificatequestion", consumes = "application/json", produces = "application/json")
    public CertificateQuestion saveQuestion(@RequestBody CertificateQuestion question) {
        return certificateQuestionService.saveCertificateQuestion(question);

    }

    @PostMapping(value = "/saveallcertificatequestion", produces = "application/json", consumes = "application/json")
    public List<CertificateQuestion> saveAllCertificateQuestion(@RequestBody List<CertificateQuestion> questionList) {
        return certificateQuestionService.saveAllCertificateQuestion(questionList);

    }

}

























