package com.example.Music_Player.controller;

import com.example.Music_Player.model.LikedSong;
import com.example.Music_Player.model.LoginRequest;
import com.example.Music_Player.model.LoginResponse;
import com.example.Music_Player.model.User;
import com.example.Music_Player.repository.UserRepository;
import com.example.Music_Player.service.JwtService;
import com.example.Music_Player.service.LikedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtService jwt;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        User user = repo.findByMobile(req.getMobile());

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid Mobile Number");
        }

        // Check hashed password
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid Password");
        }

        // Generate JWT token
        String token = jwt.generateToken(user);

        // Send token + user details
        LoginResponse response = new LoginResponse(token, user);

        return ResponseEntity.ok(response);
    }


    @PostMapping("/signup")
    public User register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

}

