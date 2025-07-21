package com.barbershop.api.dto.request;

import com.barbershop.api.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.barbershop.api.utils.ValidationConstants.*;

@Data
public class RegisterRequest {

    @NotBlank(message = NAME_IS_REQUIRED)
    private String name;

    @Email(message = INVALID_EMAIL_FORMAT)
    @NotBlank(message = EMAIL_IS_REQUIRED)
    private String email;

    @NotBlank(message = PASSWORD_IS_REQUIRED)
    @Size(min = 6, message = PASSWORD_MIN_LENGTH)
    private String password;

    @NotNull(message = ROLE_IS_REQUIRED)
    private Role role;
}
