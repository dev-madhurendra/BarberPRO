package com.barbershop.api.service;

import com.barbershop.api.dto.response.VerificationResponse;

public interface OtpService {
    String sendOtp(String destination);
    VerificationResponse verifyOtp(String destination, String otp);
    boolean supports(String medium);
}