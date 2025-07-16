package com.barbershop.api.controller;

import com.barbershop.api.service.OtpServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpServiceFactory otpServiceFactory;

    @PostMapping("/send")
    public String sendOtp(@RequestParam String medium, @RequestParam String destination) {
        return otpServiceFactory.getOtpService(medium).sendOtp(destination);
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String medium, @RequestParam String destination, @RequestParam String otp) {
        boolean success = otpServiceFactory.getOtpService(medium).verifyOtp(destination, otp);
        return success ? "OTP Verified Successfully" : "Invalid or Expired OTP";
    }
}
