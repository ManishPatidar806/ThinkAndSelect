package com.quiz.knowledge_test_backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtConfig {

    private  static  final  String SECRET_KEY_STRING = "manisfdgdtryyydfwetidarclassmaJmanysthrtyreyeyhfahdjkfhdfhkas";
    public final Key SECREAT_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());

    public String generatToken(String username){
        String token = Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis()+1000*60*60*60))
                .signWith(SECREAT_KEY)
                .compact();
        System.out.println("Generated Token is "+token);
        return token;
    }

    public boolean validateToken (String token) throws Exception {
        try {
            Jwts.parserBuilder().setSigningKey(SECREAT_KEY).build().parseClaimsJws(token);
            return true;
        }catch (Exception e){
            System.out.println("Token not validate");
            return false;
        }
    }

    public String getName(String token){
        Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(SECREAT_KEY).build().parseClaimsJws(token);
        return claims.getBody().getSubject();
    }

}
