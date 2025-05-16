package com.quiz.knowledge_test_backend.controller;


import com.quiz.knowledge_test_backend.service.CertificationService;
import com.quiz.knowledge_test_backend.service.UserDetail;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/v1/api/certification/")
@RestController
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @GetMapping("/generate-certificate")
    public ResponseEntity<byte[]> generateCertificate(@AuthenticationPrincipal UserDetail userDetail) throws Exception {
        String fullName = userDetail.getFullName();
        byte[] certificate = certificationService.generateCertificate(fullName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "certificate.pdf");
        return ResponseEntity.ok().headers(headers).body(certificate);


    }
}
