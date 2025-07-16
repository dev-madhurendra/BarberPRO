package com.barbershop.api.controller;

import com.barbershop.api.dto.request.LoginRequest;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.response.RegisterResponse;
import com.barbershop.api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import static com.barbershop.api.utils.RouteConstants.*;
import static com.barbershop.api.utils.RouteConstants.AUTH_ENDPOINT;

@RestController
@RequestMapping(AUTH_ENDPOINT)
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(REGISTER_ENDPOINT)
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping(LOGIN_ENDPOINT)
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

}
