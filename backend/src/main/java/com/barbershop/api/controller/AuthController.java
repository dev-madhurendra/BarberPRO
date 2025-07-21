package com.barbershop.api.controller;

import com.barbershop.api.dto.request.LoginRequest;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.request.ResetPasswordRequest;
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

import static com.barbershop.api.utils.ResponseCodeConstants.*;
import static com.barbershop.api.utils.ResponseMessageConstants.*;
import static com.barbershop.api.utils.RouteConstants.*;
import static com.barbershop.api.utils.SwaggerConstants.*;

@RestController
@RequestMapping(value = AUTH_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = TAG_AUTH_MANAGEMENT_NAME, description = TAG_AUTH_MANAGEMENT_DESC)
public class AuthController {

    private final AuthService authService;

    @PostMapping(REGISTER_ENDPOINT)
    @Operation(
            summary = REGISTER_SUMMARY,
            description = REGISTER_DESCRIPTION,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = DESCRIPTION_REGISTRATION_SUCCESSFUL,
                            content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_400,
                            description = DESCRIPTION_INVALID_INPUT
                    )
            }
    )
    public ResponseEntity<ApiResponse<RegisterResponse>> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(REGISTER_SUCCESS_MESSAGE, response));
    }

    @PostMapping(LOGIN_ENDPOINT)
    @Operation(
            summary = LOGIN_SUMMARY,
            description = LOGIN_DESCRIPTION,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = DESCRIPTION_LOGIN_SUCCESSFUL,
                            content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_401,
                            description = DESCRIPTION_INVALID_CREDENTIALS
                    )
            }
    )
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(LOGIN_SUCCESS_MESSAGE, response));
    }

    @PostMapping(RESET_PASSWORD_ENDPOINT)
    @Operation(
            summary = "Reset Password",
            description = "Reset the user's password using email and OTP",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = "Password reset successful",
                            content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_400,
                            description = "Invalid OTP or request data"
                    )
            }
    )
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password reset successful", null));
    }

    @GetMapping("/oauth2/google")
    public ResponseEntity<ApiResponse<LoginResponse>> googleAuth(
            @RequestParam String email,
            @RequestParam String name
    ) {
        LoginResponse response = authService.googleLogin(email, name);
        return ResponseEntity.ok(ApiResponse.success("Google Login Successful", response));
    }




}
