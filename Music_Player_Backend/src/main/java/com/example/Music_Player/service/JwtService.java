package com.example.Music_Player.service;

import com.example.Music_Player.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private static final String secret = "b8d9fa29c08444cbb3f019a08bf3012e8af3c7478b33dbe2d12ce44f2e781f77";


    // Generate JWT with multiple user details
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("name", user.getName());
        claims.put("mobile", user.getMobile());
        claims.put("address", user.getAddress());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getMobile()) // subject can still be mobile
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hrs
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    // Extract claims from token
    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getMobileFromToken(String token) {
        return getClaimsFromToken(token).get("mobile", String.class);
    }

    public String getNameFromToken(String token) {
        return getClaimsFromToken(token).get("name", String.class);
    }

    public Long getIdFromToken(String token) {
        return getClaimsFromToken(token).get("id", Long.class);
    }

    public String getAddressFromToken(String token) {
        return getClaimsFromToken(token).get("address", String.class);
    }


}


