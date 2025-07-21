package com.barbershop.api.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerificationResponse {
    String token;
    boolean isVerified;
}
