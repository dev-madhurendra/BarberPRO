package com.barbershop.api.dto.response;



import com.barbershop.api.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@SuperBuilder
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
