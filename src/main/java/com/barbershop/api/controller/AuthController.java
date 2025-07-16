package com.barbershop.api.controller;

import com.barbershop.api.dto.request.AuthRequest;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.response.RegisterResponse;
import com.barbershop.api.entity.User;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import static com.barbershop.api.utils.RouteConstants.*;
import static com.barbershop.api.utils.RouteConstants.AUTH_ENDPOINT;
import static com.barbershop.api.utils.ValidationMessages.USER_REGISTERED_SUCCESSFULLY;

@RestController
@RequestMapping(AUTH_ENDPOINT)
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping(REGISTER_ENDPOINT)
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping(LOGIN_ENDPOINT)
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isVerified())
            return ResponseEntity.badRequest().body("User already verified");

        if (!user.getOtp().equals(request.getOtp()))
            return ResponseEntity.badRequest().body("Invalid OTP");

        if (user.getOtpExpiry().isBefore(LocalDateTime.now()))
            return ResponseEntity.badRequest().body("OTP expired");

        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok("Email verified successfully");
    }
}
