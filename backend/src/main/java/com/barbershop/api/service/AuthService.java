package com.barbershop.api.service;

import com.barbershop.api.dto.request.LoginRequest;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.request.ResetPasswordRequest;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.response.RegisterResponse;
import com.barbershop.api.dto.response.UserDTO;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    void resetPassword(ResetPasswordRequest request);
    UserDTO updateRoleAsBarber(String token, String newRole);
    UserDTO getCurrentUser(String token);
}
