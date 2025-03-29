package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.entity.PracticeQuestion;
import com.quiz.knowledge_test_backend.repository.PracticeQuestionRepository;
import com.quiz.knowledge_test_backend.response.QuestionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PracticeQuestionServiceImpl implements PracticeQuestionService {

    @Autowired
    private PracticeQuestionRepository practiceQuestionRepository;

    /*
     * For Practice Question
     * */
    public List<QuestionResponse> getPracticeQuestion(String type) {
        System.out.println(type);
        List<PracticeQuestion> temQuestion = practiceQuestionRepository.findPracticeQuestionBy(type);
        List<QuestionResponse> result = new ArrayList<>();

        for (PracticeQuestion question : temQuestion) {
            List<String> temOption = new ArrayList<>();
            temOption.add(question.getOptionA());
            temOption.add(question.getOptionB());
            temOption.add(question.getOptionC());
            temOption.add(question.getOptionD());

            Collections.shuffle(temOption);

            QuestionResponse qr = new QuestionResponse();
            qr.setQuestionId(question.getPracticeQuestionId());
            qr.setQuestion(question.getQuestion());
            qr.setType(question.getType());
            qr.setOptions(temOption);

            result.add(qr);
        }
        return result;
    }

    public boolean checkPracticeQuestion(String answer, Long id){
        Optional<PracticeQuestion> pq = practiceQuestionRepository.findById(id);
        PracticeQuestion temQuestion = pq.get();
        if(temQuestion.getAnswer().equals(answer)){
            return  true;
        }
        return false;
    }

    public PracticeQuestion savePracticeQuestion(PracticeQuestion question){

        return practiceQuestionRepository.save(question);
    }

    public List<PracticeQuestion> saveAllPracticeQuestion(List<PracticeQuestion> question){

        return practiceQuestionRepository.saveAll(question);
    }

}
