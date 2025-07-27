package com.barbershop.api.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class BarberDTO extends UserDTO {
    private boolean isBarberProfileUpdated;
}
