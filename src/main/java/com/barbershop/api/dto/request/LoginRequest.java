package com.barbershop.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import static com.barbershop.api.utils.ValidationMessages.*;

@Getter
@Setter
public class LoginRequest {

    @Email(message = INVALID_EMAIL_FORMAT)
    @NotBlank(message = EMAIL_IS_REQUIRED)
    private String email;

    @NotBlank(message = PASSWORD_IS_REQUIRED)
    private String password;
}
