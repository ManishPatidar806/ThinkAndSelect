package com.quiz.knowledge_test_backend.controller;

import com.quiz.knowledge_test_backend.model.response.AnswerResponse;
import com.quiz.knowledge_test_backend.model.response.Question;
import com.quiz.knowledge_test_backend.model.response.QuestionsResponse;
import com.quiz.knowledge_test_backend.service.PracticeQuestionService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/api/quiz/question")
public class PracticeQuestionController {
    private final PracticeQuestionService practiceQuestionService;

    public PracticeQuestionController(PracticeQuestionService practiceQuestionService) {
        this.practiceQuestionService = practiceQuestionService;
    }


    /*
     * Api for Practice Quiz
     */
    @GetMapping("/practicequestion")
    public ResponseEntity<?> getPracticeQuestion(@RequestParam("type") String type) throws Exception {
        QuestionsResponse response  = practiceQuestionService.getPracticeQuestion(type);
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/checkpracticeanswer")
    public ResponseEntity<?> checkPracticeAnswer(@RequestParam("answer") String answer, @RequestParam("id") Long temId) throws Exception {

        AnswerResponse response =practiceQuestionService.checkPracticeQuestion(answer, temId);
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
    }




    /*
     * For Admin Role
     * */

//
//    @GetMapping(value = "/savepracticequestion")
//    public PracticeQuestion saveQuestion(@RequestBody PracticeQuestion question) {
//        return practiceQuestionService.savePracticeQuestion(question);
//
//    }
//
//    @PostMapping(value = "/saveallpracticequestion")
//    public List<PracticeQuestion> saveAllPracticeQuestion(@RequestBody List<PracticeQuestion> questionList) {
//        return practiceQuestionService.saveAllPracticeQuestion(questionList);
//
//    }
}
