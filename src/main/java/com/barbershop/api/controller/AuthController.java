package com.barbershop.api.controller;

import com.barbershop.api.dto.request.LoginRequest;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.response.ApiResponse;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.response.RegisterResponse;
import com.barbershop.api.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.barbershop.api.utils.RouteConstants.*;

@RestController
@RequestMapping(value = AUTH_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "Auth Management", description = "Endpoints for managing authentication")
public class AuthController {

    private final AuthService authService;

    @PostMapping(REGISTER_ENDPOINT)
    @Operation(
            summary = "Register",
            description = "Registers a new user.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Registration successful",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class))),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid input")
            }
    )
    public ResponseEntity<ApiResponse<RegisterResponse>> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", response));
    }

    @PostMapping(LOGIN_ENDPOINT)
    @Operation(
            summary = "Login",
            description = "Authenticates a user and returns a JWT token.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Login successful",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class))),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid credentials")
            }
    )
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }
}
