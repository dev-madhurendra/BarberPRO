package com.barbershop.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.barbershop.api.utils.ExceptionConstants.NO_OTP_SVC_FOUND;

@Component
@RequiredArgsConstructor
public class OtpServiceFactory {

    private final List<OtpService> otpServices;

    public OtpService getOtpService(String medium) {
        return otpServices.stream()
                .filter(service -> service.supports(medium))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(NO_OTP_SVC_FOUND + medium));
    }
}

