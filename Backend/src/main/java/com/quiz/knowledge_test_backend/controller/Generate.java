package com.quiz.knowledge_test_backend.controller;


import com.quiz.knowledge_test_backend.config.JwtConfig;
import com.quiz.knowledge_test_backend.entity.User;
import com.quiz.knowledge_test_backend.repository.AuthRepository;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.URL;


@RestController
public class Generate {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private JwtConfig jwtConfig;


    @Value("${Certificate.Url}")
    private String Url;

    @Value("${Font.Url}")
    private String fontUrl;

    @GetMapping("/generate-certificate")
    public ResponseEntity<byte[]> generateCertificate(@RequestHeader(value = "Authorization") String authoString) throws Exception {

        if(authoString!=null&&authoString.startsWith("Bearer ")){
            String token  = authoString.substring(7);
            if (jwtConfig.validateToken(token)) {
                String email = jwtConfig.getName(token);

               User user = authRepository.findByEmail(email);

               String username = user.getFullname();

                try {
                    URL url = new URL(Url);
                    InputStream in = url.openStream();
                    File tempFile = new File("Certification.pdf");
                    try (OutputStream out = new FileOutputStream(tempFile)) {
                        byte[] buffer = new byte[1024];
                        int length;
                        while ((length = in.read(buffer)) != -1) {
                            out.write(buffer, 0, length);
                        }
                    }

                    PDDocument document = Loader.loadPDF(tempFile);
                    InputStream fontInputStream = new URL(fontUrl).openStream();


                    PDFont font = PDType0Font.load(document, fontInputStream);

                    PDPage page = document.getPage(0);
                    PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true);
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
