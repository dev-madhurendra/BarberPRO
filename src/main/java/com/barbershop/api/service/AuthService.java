package com.barbershop.api.service;

import com.barbershop.api.dto.request.LoginRequest;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.request.ResetPasswordRequest;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.response.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    void resetPassword(ResetPasswordRequest request);
    LoginResponse googleLogin(String email, String name);
}
