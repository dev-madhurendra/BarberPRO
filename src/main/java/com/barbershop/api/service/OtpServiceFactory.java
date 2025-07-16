package com.barbershop.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OtpServiceFactory {

    private final List<OtpService> otpServices;

    public OtpService getOtpService(String medium) {
        return otpServices.stream()
                .filter(service -> service.supports(medium))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No OTP service found for medium: " + medium));
    }
}

