package com.quiz.knowledge_test_backend.utility;

import com.quiz.knowledge_test_backend.model.Enum.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Configuration;

import java.security.Key;
import java.util.Date;

@Configuration
public class JwtConfig {

    private final String SECRET_SENTENCE = "jladkf;sdalkfj;sdfj;asdjf;laksdjf;ldksajf;lksdjf;klasjflkvnsanvmcnvmxcnvmnjsfhdsufidsfn";
    public final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_SENTENCE.getBytes());

    public String generateToken(String email) {
        return Jwts.builder().setSubject(email).setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 60)).
                signWith(SECRET_KEY).compact();

    }
    public boolean validateToken(String token,String username){
       try {
           Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
           return extractUsername(token).equals(username);
       }catch (Exception e){
           return false;
       }


    }
    public String extractUsername(String token){
        Jws<Claims> jws = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
        return jws.getBody().getSubject();
    }



}
