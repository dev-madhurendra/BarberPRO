package com.barbershop.api.service;

import com.barbershop.api.dto.response.BarberProfileResponse;
import com.barbershop.api.entity.BarberProfile;
import com.barbershop.api.security.UserPrincipal;

import java.util.List;

public interface BarberProfileService {
    BarberProfileResponse createBarberProfile(BarberProfile profile, UserPrincipal userPrincipal);
    BarberProfileResponse updateBarberProfile(Long id, BarberProfile profile);
    BarberProfileResponse getBarberProfile(Long id);
    List<BarberProfileResponse> searchBarbersByAddress(String address);
    void deleteBarberProfile(Long id);
}
