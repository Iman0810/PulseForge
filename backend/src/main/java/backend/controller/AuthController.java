package backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import backend.dto.RegisterRequest;
import backend.model.User;
import backend.repository.UserRepository;
import backend.service.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        User user = userRepository
                .findByUsername(request.username());

        if (user == null) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid username or password");
        }

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword()
        )) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid username or password");
        }

        String token =
                jwtService.generateToken(
                        user.getUsername()
                );

        return ResponseEntity.ok(
                new LoginResponse(token)
        );
    }

    public record LoginRequest(
            String username,
            String password
    ) {}

    public record LoginResponse(
            String token
    ) {}

@PostMapping("/register")
public ResponseEntity<?> register(
        @Valid @RequestBody RegisterRequest request
) {

    if (userRepository.findByUsername(request.getUsername()) != null) {

        return ResponseEntity
                .badRequest()
                .body("Username already exists");
    }

    User user = new User();

    user.setUsername(request.getUsername());

    user.setPassword(
            passwordEncoder.encode(request.getPassword())
    );

    user.setRole("USER");
    
    userRepository.save(user);

    return ResponseEntity.ok(
            "User registered successfully."
    );
}
}