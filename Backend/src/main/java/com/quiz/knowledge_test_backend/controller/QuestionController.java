package com.quiz.knowledge_test_backend.controller;

import com.quiz.knowledge_test_backend.AuthHelper.AuthHelper;
import com.quiz.knowledge_test_backend.entity.CertificateQuestion;
import com.quiz.knowledge_test_backend.entity.PracticeQuestion;
import com.quiz.knowledge_test_backend.response.QuestionResponse;
import com.quiz.knowledge_test_backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("quiz")
@RestController
public class QuestionController {
    @Autowired
        QuestionService questionService;

    /*
    * Api for Practice Quiz
    */
    @GetMapping("/practicequestion")
    public List<QuestionResponse> getAllQuestion(@RequestHeader(value = "Authorization") String authorizationHeader ,
                                                 @RequestParam("type") String type ) throws Exception {
        List<QuestionResponse> list = List.of();
        if (authorizationHeader!=null&&authorizationHeader.startsWith("Bearer ")){
            String token = authorizationHeader.substring(7);
            AuthHelper authHelper = new AuthHelper();
            if(authHelper.validateToken(token)){
              list = questionService.getPracticeQuestion(type);
                System.out.println(list.get(1));
            return list;
            }
        }
        return list;
    }

    @GetMapping("/checkpracticeanswer")
    public boolean checkPracticeAnswer(@RequestHeader(value = "Authorization") String authorization , @RequestParam("answer") String answer , @RequestParam("id") Long temId) throws Exception {
        if (authorization!=null&&authorization.startsWith("Bearer ")){
            String token = authorization.substring(7);
            AuthHelper authHelper = new AuthHelper();
            if(authHelper.validateToken(token)){
                Long id = temId;
            return questionService.checkPracticeQuestion(answer,id);

            }
        }
        return false;
    }



    @GetMapping(value = "/savepracticequestion" , consumes = "application/json" , produces = "application/json")
    public PracticeQuestion saveQuestion(@RequestBody PracticeQuestion question){
        return questionService.savePracticeQuestion(question);

    }

    @PostMapping(value = "/saveallpracticequestion", produces = "application/json" , consumes = "application/json")
    public List<PracticeQuestion> saveAllPracticeQuestion(@RequestBody List<PracticeQuestion> questionList){
        return questionService.saveAllPracticeQuestion(questionList);

    }

    @GetMapping(value = "/removeallpracticequestion")
    public void removeAllPracticeQuestion(){
         questionService.removeAllPracticeQuestion();

    }


/*
* for Certificate Question
* */
    @GetMapping("/certificatequiz")
    public List<QuestionResponse> getAll(@RequestHeader(value = "Authorization") String autherHeader ,
                                            @RequestParam("type") String type) throws Exception {
        List<QuestionResponse> list = List.of();

        if(autherHeader!=null&&autherHeader.startsWith("Bearer ")){
            String token = autherHeader.substring(7);
            AuthHelper authHelper = new AuthHelper();
            if(authHelper.validateToken(token)){
                list=questionService.getCertificateQuestion(type);
                return list;
            }
        }
        return  list;

    }

    @GetMapping("/checkcertificateanswer")
    public boolean checkCertificateAnswer(@RequestHeader(value = "Authorization") String authorization , @RequestParam("answer") String answer , @RequestParam("id") Long temId) throws Exception {
        if (authorization!=null&&authorization.startsWith("Bearer ")){
            String token = authorization.substring(7);
            AuthHelper authHelper = new AuthHelper();
            if(authHelper.validateToken(token)){
                Long id = temId;
                return questionService.checkCertificateQuestion(answer,id);

            }
        }
        return false;
    }






    @PostMapping(value = "/savecertificatequestion" , consumes = "application/json" , produces = "application/json")
    public CertificateQuestion saveQuestion(@RequestBody CertificateQuestion question){
        return questionService.saveCertificateQuestion(question);

    }

    @PostMapping(value = "/saveallcertificatequestion", produces = "application/json" , consumes = "application/json")
    public List<CertificateQuestion> saveAllCertificateQuestion(@RequestBody List<CertificateQuestion> questionList){
        return questionService.saveAllCertificateQuestion(questionList);

    }


























    @GetMapping("/secure")
    public String Secure(@RequestHeader(value = "Authorization") String authorizationHeader) throws Exception {

        if (authorizationHeader!=null&&authorizationHeader.startsWith("Bearer ")){
            String token = authorizationHeader.substring(7);
            AuthHelper authHelper = new AuthHelper();
            if(authHelper.validateToken(token)){
                return "Api is Secure";
            }else {
                return "Api is not Secure";
            }
        }
        return "not found any thing";
    }

}
