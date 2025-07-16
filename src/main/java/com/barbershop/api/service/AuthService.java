package com.barbershop.api.service;

import com.barbershop.api.dto.request.AuthRequest;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.response.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);
    LoginResponse login(AuthRequest request);
}
