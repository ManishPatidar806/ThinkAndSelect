package com.quiz.knowledge_test_backend.controller;

import com.quiz.knowledge_test_backend.AuthHelper.AuthHelper;
import com.quiz.knowledge_test_backend.entity.User;
import com.quiz.knowledge_test_backend.repository.AuthRepository;
import io.jsonwebtoken.Jwts;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;

import java.io.ByteArrayOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class Generate {

    @Autowired
    AuthRepository authRepository;

    @GetMapping("/generate-certificate")
    public ResponseEntity<byte[]> generateCertificate(@RequestHeader(value = "Authorization") String authoString) throws Exception {

        if(authoString!=null&&authoString.startsWith("Bearer ")){
            String token  = authoString.substring(7);
            AuthHelper authHelper = new AuthHelper();
            if(authHelper.validateToken(token)){
               String email =  authHelper.getName(token);

               User user = authRepository.findByEmail(email);

               String username = user.getFullname();


                try {
                    // Load sample PDF
                    ClassPathResource resource = new ClassPathResource("Certificate.pdf");
                    File file = resource.getFile();
                    PDDocument document = Loader.loadPDF(file);

                    // Replace username in PDF
                    PDPage page = document.getPage(0);
                    PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true);
                    PDFont font = PDType0Font.load(document, new File("src/main/resources/Fonts/Updock-Regular.ttf"));
                    contentStream.setFont(font, 47f);
                    contentStream.setNonStrokingColor(0.0f, 0.0f, 0.0f);
                    try {
                        contentStream.beginText();
                        contentStream.newLineAtOffset(365.669291339f, 330.031476063f); // x, y coordinates
                        contentStream.showText(username);
                        contentStream.endText();
                        contentStream.close();
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }

                    // Save PDF to ByteArrayOutputStream
                    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                    document.save(byteArrayOutputStream);
                    document.close();

                    // Return PDF as response
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_PDF);
                    headers.setContentDispositionFormData("attachment", "certificate.pdf");
                    return ResponseEntity.ok().headers(headers).body(byteArrayOutputStream.toByteArray());

                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(500).body(null);
                }
            }
        }


        return ResponseEntity.status(302).body(null);
    }
}
