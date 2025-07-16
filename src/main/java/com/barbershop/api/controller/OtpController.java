package com.barbershop.api.controller;

import com.barbershop.api.dto.response.ApiResponse;
import com.barbershop.api.service.OtpServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.barbershop.api.utils.RouteConstants.*;

@RestController
@RequestMapping(OTP_ENDPOINT)
@RequiredArgsConstructor
public class OtpController {

    private final OtpServiceFactory otpServiceFactory;

    @PostMapping(SEND_OTP)
    public ResponseEntity<ApiResponse<Void>> sendOtp(@RequestParam String medium, @RequestParam String destination) {
        otpServiceFactory.getOtpService(medium).sendOtp(destination);
        return ResponseEntity.ok(ApiResponse.success("OTP sent successfully to " + destination));
    }

    @PostMapping(VERIFY_OTP)
    public ResponseEntity<ApiResponse<Void>> verifyOtp(@RequestParam String medium, @RequestParam String destination, @RequestParam String otp) {
        boolean success = otpServiceFactory.getOtpService(medium).verifyOtp(destination, otp);
        return success
                ? ResponseEntity.ok(ApiResponse.success("OTP verified successfully"))
                : ResponseEntity.badRequest().body(ApiResponse.failure("Invalid or expired OTP"));
    }
}
