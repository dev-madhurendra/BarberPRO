package com.barbershop.api.service;

public interface EmailService {
    void sendOtpEmail(String to, String otp);
}
