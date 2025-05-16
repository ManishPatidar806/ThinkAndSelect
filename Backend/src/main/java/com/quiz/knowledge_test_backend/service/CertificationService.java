package com.quiz.knowledge_test_backend.service;

import org.springframework.stereotype.Service;


import java.io.IOException;


@Service
public interface CertificationService {
    public byte[] generateCertificate(String fullName) throws IOException;
}
