package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.Exception.ResourceNotFoundException;
import com.quiz.knowledge_test_backend.model.entity.CertificateQuestion;
import com.quiz.knowledge_test_backend.model.response.AnswerResponse;
import com.quiz.knowledge_test_backend.model.response.Question;
import com.quiz.knowledge_test_backend.model.response.QuestionsResponse;
import com.quiz.knowledge_test_backend.repository.CertificateQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CertificateQuestionServiceImpl implements CertificateQuestionService{

    private final CertificateQuestionRepository certificateQuestionRepository;

    public CertificateQuestionServiceImpl(CertificateQuestionRepository certificateQuestionRepository) {
        this.certificateQuestionRepository = certificateQuestionRepository;
    }

    /*
     * For Certificate Question
     * */

    public QuestionsResponse getCertificateQuestion(String type) throws ResourceNotFoundException {
        List<CertificateQuestion> questions = certificateQuestionRepository.findCertificateQuestion(type);

        if (questions.isEmpty()) {
            throw new ResourceNotFoundException("No certificate questions found for type: " + type);
        }
        List<Question> collect = questions.stream().map(q -> {
            List<String> options = new ArrayList<>(List.of(q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD()));
            Collections.shuffle(options);
            Question qr = new Question();
            qr.setQuestionId(q.getCertificateQuestionId());
            qr.setQuestion(q.getQuestion());
            qr.setType(q.getType());
            qr.setOptions(options);

            return qr;
        }).collect(Collectors.toList());

        return new QuestionsResponse(collect, collect.size(), "Question Fetch Successfully", true);
    }


    public AnswerResponse checkCertificateQuestion(String answer, Long id) throws ResourceNotFoundException {
        Optional<CertificateQuestion> pq = certificateQuestionRepository.findById(id);
        pq.orElseThrow(() -> new ResourceNotFoundException("Question Not Found"));
        boolean correct = pq.get().getAnswer().equals(answer);
        return new AnswerResponse("Answer Checked Successfully", correct, true);
    }



    /*
     *
     * For Admin Role
     * */

    public CertificateQuestion saveCertificateQuestion(CertificateQuestion question){

        return certificateQuestionRepository.save(question);
    }

    public List<CertificateQuestion> saveAllCertificateQuestion(List<CertificateQuestion> question){

        return certificateQuestionRepository.saveAll(question);
    }
}
