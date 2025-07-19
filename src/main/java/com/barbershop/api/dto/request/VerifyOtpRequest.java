package com.barbershop.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import static com.barbershop.api.utils.ValidationConstants.*;

@Data
public class VerifyOtpRequest {
    @Email(message = INVALID_EMAIL_FORMAT)
    @NotBlank(message = EMAIL_IS_REQUIRED)
    private String email;

    @NotBlank(message = OTP_IS_REQUIRED)
    private String otp;
}
