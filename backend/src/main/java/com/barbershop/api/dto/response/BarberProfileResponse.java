package com.barbershop.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class BarberProfileResponse {
    private Long id;
    private BarberDTO barberDTO;
    private String shopName;
    private String phoneNumber;
    private String address;
    private String city;
    private String pinCode;
    private String servicesOffered;
    private Double startingPrice;
}
