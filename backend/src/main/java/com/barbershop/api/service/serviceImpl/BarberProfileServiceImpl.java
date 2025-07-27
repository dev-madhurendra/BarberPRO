package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.dto.response.BarberDTO;
import com.barbershop.api.dto.response.BarberProfileResponse;
import com.barbershop.api.entity.BarberProfile;
import com.barbershop.api.entity.User;
import com.barbershop.api.exception.AppException;
import com.barbershop.api.repository.BarberProfileRepository;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.security.UserPrincipal;
import com.barbershop.api.service.BarberProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.barbershop.api.utils.ResponseMessageConstants.RESPONSE_BARBER_PROFILE_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class BarberProfileServiceImpl implements BarberProfileService {

    private final UserRepository userRepository;
    private final BarberProfileRepository barberProfileRepository;

    @Override
    public BarberProfileResponse createBarberProfile(BarberProfile profile, UserPrincipal userPrincipal) {
        log.info("Starting createBarberProfile for user: {}", userPrincipal.getEmail());

        User user = userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> {
                    log.error("User not found with email: {}", userPrincipal.getEmail());
                    return new AppException("User not found for email: " + userPrincipal.getEmail());
                });

        log.info("User found: {}", user.getEmail());

        profile.setUser(user);
        BarberProfile savedProfile = barberProfileRepository.save(profile);
        log.info("Barber profile saved with ID: {}", savedProfile.getId());

        user.setBarberProfileUpdated(true);
        User savedUser = userRepository.save(user);
        log.info("User updated with barber profile status: {}", savedUser.isBarberProfileUpdated());

        BarberDTO barberDTO = BarberDTO.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .isBarberProfileUpdated(true)
                .build();

        BarberProfileResponse response = BarberProfileResponse.builder()
                .id(savedProfile.getId())
                .barberDTO(barberDTO)
                .shopName(savedProfile.getShopName())
                .phoneNumber(savedProfile.getPhoneNumber())
                .address(savedProfile.getAddress())
                .city(savedProfile.getCity())
                .pinCode(savedProfile.getPinCode())
                .servicesOffered(savedProfile.getServicesOffered())
                .startingPrice(savedProfile.getStartingPrice())
                .build();

        log.info("BarberProfileResponse successfully created for user: {}", user.getEmail());
        return response;
    }

    @Override
    public BarberProfileResponse updateBarberProfile(Long id, BarberProfile profile) {
        BarberProfile existing = barberProfileRepository.findById(id)
                .orElseThrow(() -> new AppException(RESPONSE_BARBER_PROFILE_NOT_FOUND));

        existing.setShopName(profile.getShopName());
        existing.setAddress(profile.getAddress());
        existing.setPhoneNumber(profile.getPhoneNumber());
        existing.setCity(profile.getCity());
        existing.setPinCode(profile.getPinCode());
        existing.setServicesOffered(profile.getServicesOffered());
        existing.setStartingPrice(profile.getStartingPrice());

        BarberProfile updatedProfile = barberProfileRepository.save(existing);

        return BarberProfileResponse.builder()
                .id(updatedProfile.getId())
                .shopName(updatedProfile.getShopName())
                .phoneNumber(updatedProfile.getPhoneNumber())
                .address(updatedProfile.getAddress())
                .city(updatedProfile.getCity())
                .pinCode(updatedProfile.getPinCode())
                .servicesOffered(updatedProfile.getServicesOffered())
                .startingPrice(updatedProfile.getStartingPrice())
                .build();
    }

    @Override
    public BarberProfileResponse getBarberProfile(Long id) {
        BarberProfile profile = barberProfileRepository.findById(id)
                .orElseThrow(() -> new AppException(RESPONSE_BARBER_PROFILE_NOT_FOUND));

        return BarberProfileResponse.builder()
                .id(profile.getId())
                .shopName(profile.getShopName())
                .phoneNumber(profile.getPhoneNumber())
                .address(profile.getAddress())
                .city(profile.getCity())
                .pinCode(profile.getPinCode())
                .servicesOffered(profile.getServicesOffered())
                .startingPrice(profile.getStartingPrice())
                .build();
    }



    @Override
    public List<BarberProfileResponse> searchBarbersByAddress(String address) {
        List<BarberProfile> profiles = barberProfileRepository.findByAddressContainingIgnoreCase(address);

        if (profiles.isEmpty()) {
            throw new AppException("No barber profiles found for address: " + address);
        }

        return profiles.stream()
                .map(profile -> BarberProfileResponse.builder()
                        .id(profile.getId())
                        .shopName(profile.getShopName())
                        .phoneNumber(profile.getPhoneNumber())
                        .address(profile.getAddress())
                        .city(profile.getCity())
                        .pinCode(profile.getPinCode())
                        .servicesOffered(profile.getServicesOffered())
                        .startingPrice(profile.getStartingPrice())
                        .build())
                .toList();
    }


    @Override
    public void deleteBarberProfile(Long id) {
        barberProfileRepository.deleteById(id);
    }

}
