package com.quiz.knowledge_test_backend.Exception;


import com.quiz.knowledge_test_backend.model.response.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Component
public class GlobalExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public ResponseEntity<ExceptionResponse> handleCommonException(CommonException exception){
        ExceptionResponse response = new ExceptionResponse();
        response.setMessage(exception.getMessage());
        response.setStatus(false);
        return new ResponseEntity<>(response , HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponse>handleResourceNotFoundException(ResourceNotFoundException exception){
        ExceptionResponse response = new ExceptionResponse();
        response.setMessage(exception.getMessage());
        response.setStatus(false);
        return new ResponseEntity<>(response , HttpStatus.valueOf(404));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exception){
        ExceptionResponse response = new ExceptionResponse();
        response.setMessage("Internal Server Error!");
        response.setStatus(false);
        return new ResponseEntity<>(response , HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
