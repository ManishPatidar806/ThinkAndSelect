package com.quiz.knowledge_test_backend.controller;

import com.quiz.knowledge_test_backend.model.response.AnswerResponse;
import com.quiz.knowledge_test_backend.model.response.QuestionsResponse;
import com.quiz.knowledge_test_backend.service.CertificateQuestionService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/v1/api/quiz/question")
public class CertificateQuestionController {
    private final CertificateQuestionService certificateQuestionService;

    public CertificateQuestionController(CertificateQuestionService certificateQuestionService) {
        this.certificateQuestionService = certificateQuestionService;
    }

    /*
     * for Certificate Question
     * */
    @GetMapping("/certificatequiz")
    public ResponseEntity<?> getCertificateQuestion(@RequestParam("type") @NotBlank String type) throws Exception {
        QuestionsResponse response = certificateQuestionService.getCertificateQuestion(type);

        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/checkcertificateanswer")
    public ResponseEntity<?> checkCertificateAnswer(@RequestParam("answer") @NotBlank String answer, @RequestParam("id") @NotNull Long temId) throws Exception {
        AnswerResponse response = certificateQuestionService.checkCertificateQuestion(answer, temId);
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));

    }




    /*
     * For admin Role
     * */


//    @PostMapping(value = "/savecertificatequestion")
//    public CertificateQuestion saveQuestion(@RequestBody CertificateQuestion question) {
//        return certificateQuestionService.saveCertificateQuestion(question);
//
//    }
//
//    @PostMapping(value = "/saveallcertificatequestion")
//    public List<CertificateQuestion> saveAllCertificateQuestion(@RequestBody List<CertificateQuestion> questionList) {
//        return certificateQuestionService.saveAllCertificateQuestion(questionList);
//
//    }
}
