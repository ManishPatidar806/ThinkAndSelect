package com.quiz.knowledge_test_backend.Exception;


public class ResourceNotFoundException extends Exception {
    public ResourceNotFoundException(String message){
        super(message);
    }
    public ResourceNotFoundException(){
        super();
    }
}
