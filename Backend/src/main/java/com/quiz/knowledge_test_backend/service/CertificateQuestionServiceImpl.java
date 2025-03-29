package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.entity.CertificateQuestion;
import com.quiz.knowledge_test_backend.repository.CertificateQuestionRepository;
import com.quiz.knowledge_test_backend.response.QuestionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CertificateQuestionServiceImpl implements CertificateQuestionService{
    @Autowired
    CertificateQuestionRepository certificateQuestionRepository;


    /*
     * For Certificate Question
     * */

    public List<QuestionResponse> getCertificateQuestion(String type){
        System.out.println(type);
        List<CertificateQuestion> temQuestion =  certificateQuestionRepository.findCertificateQuestion(type);



        List<QuestionResponse> result = new ArrayList<>();

        for (CertificateQuestion question : temQuestion) {
            List<String> temOption = new ArrayList<>();
            temOption.add(question.getOptionA());
            temOption.add(question.getOptionB());
            temOption.add(question.getOptionC());
            temOption.add(question.getOptionD());

            Collections.shuffle(temOption);

            QuestionResponse qr = new QuestionResponse();
            qr.setQuestionId(question.getCertificateQuestionId());
            qr.setQuestion(question.getQuestion());
            qr.setType(question.getType());
            qr.setOptions(temOption);

            result.add(qr);
        }
        return result;

    }

    public boolean checkCertificateQuestion(String answer, Long id){
        Optional<CertificateQuestion> pq = certificateQuestionRepository.findById(id);
        CertificateQuestion temQuestion = pq.get();
        if(temQuestion.getAnswer().equals(answer)){
            return  true;
        }
        return false;
    }


    public CertificateQuestion saveCertificateQuestion(CertificateQuestion question){

        return certificateQuestionRepository.save(question);
    }

    public List<CertificateQuestion> saveAllCertificateQuestion(List<CertificateQuestion> question){

        return certificateQuestionRepository.saveAll(question);
    }
}
