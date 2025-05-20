package com.quiz.knowledge_test_backend.service;

import com.quiz.knowledge_test_backend.Exception.ResourceNotFoundException;
import com.quiz.knowledge_test_backend.model.entity.PracticeQuestion;
import com.quiz.knowledge_test_backend.model.response.AnswerResponse;
import com.quiz.knowledge_test_backend.model.response.Question;
import com.quiz.knowledge_test_backend.model.response.QuestionsResponse;
import com.quiz.knowledge_test_backend.repository.PracticeQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PracticeQuestionServiceImpl implements PracticeQuestionService {


    private PracticeQuestionRepository practiceQuestionRepository;

    public PracticeQuestionServiceImpl(PracticeQuestionRepository practiceQuestionRepository) {
        this.practiceQuestionRepository = practiceQuestionRepository;
    }

    /*
     * For Practice Question
     * */
    public QuestionsResponse getPracticeQuestion(String type) throws ResourceNotFoundException {
        List<PracticeQuestion> temQuestion = practiceQuestionRepository.findPracticeQuestionBy(type);
        if (temQuestion.isEmpty()) {
            throw new ResourceNotFoundException("No certificate questions found for type: " + type);
        }
        List<Question> collect = temQuestion.stream().map(q -> {
            List<String> options = new ArrayList<>(List.of(
                    q.getOptionA(),
                    q.getOptionB(),
                    q.getOptionC(),
                    q.getOptionD()));

            Collections.shuffle(options);

            Question qr = new Question();
            qr.setQuestion(q.getQuestion());
            qr.setQuestionId(q.getPracticeQuestionId());
            qr.setType(q.getType());
            qr.setOptions(options);
            return qr;

        }).collect(Collectors.toList());
        return new QuestionsResponse(collect, collect.size(), "Question Fetch Successfully", true);

    }

    public AnswerResponse checkPracticeQuestion(String answer, Long id) throws ResourceNotFoundException {
        Optional<PracticeQuestion> pq = practiceQuestionRepository.findById(id);
        pq.orElseThrow(ResourceNotFoundException::new);

        boolean correct = pq.get().getAnswer().equals(answer);
        return new AnswerResponse("Answer Checked Successfully", correct, true);
    }

    public PracticeQuestion savePracticeQuestion(PracticeQuestion question){

        return practiceQuestionRepository.save(question);
    }

    public List<PracticeQuestion> saveAllPracticeQuestion(List<PracticeQuestion> question){

        return practiceQuestionRepository.saveAll(question);
    }

}
