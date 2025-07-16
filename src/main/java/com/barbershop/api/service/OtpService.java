package com.barbershop.api.service;

public interface OtpService {
    String sendOtp(String destination);
    boolean verifyOtp(String destination, String otp);
    boolean supports(String medium);
}