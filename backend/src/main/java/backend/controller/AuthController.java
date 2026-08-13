package backend.controller;

import backend.dto.RegisterRequest;
import backend.model.User;
import backend.repository.UserRepository;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }


    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        if (userRepository.existsByUsername(request.getUsername())) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");

        }


        User user = new User();

        user.setUsername(request.getUsername());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole("USER");


        userRepository.save(user);


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully");

    }

}