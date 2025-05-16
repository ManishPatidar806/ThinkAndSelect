package com.quiz.knowledge_test_backend.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URL;

@Service
public class CretificationServiceImpl implements CertificationService {

    @Value("${Certificate.Url}")
    private String url;

    @Value("${Font.Url}")
    private String fontUrl;


    public byte[] generateCertificate(String fullName) throws IOException {

        URL url1 = new URL(url);
        InputStream in = url1.openStream();
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
            contentStream.showText(fullName);
            contentStream.endText();
            contentStream.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Save PDF to ByteArrayOutputStream
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        document.save(byteArrayOutputStream);
        document.close();
        return byteArrayOutputStream.toByteArray();


    }
}
