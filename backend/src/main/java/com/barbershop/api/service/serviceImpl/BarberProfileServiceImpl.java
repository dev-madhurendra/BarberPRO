package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.dto.response.BarberProfileResponse;
import com.barbershop.api.dto.response.UserDTO;
import com.barbershop.api.entity.BarberProfile;
import com.barbershop.api.entity.User;
import com.barbershop.api.repository.BarberProfileRepository;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.security.UserPrincipal;
import com.barbershop.api.service.BarberProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.barbershop.api.utils.ResponseMessageConstants.RESPONSE_BARBER_PROFILE_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class BarberProfileServiceImpl implements BarberProfileService {

    private final UserRepository userRepository;
    private final BarberProfileRepository barberProfileRepository;

    @Override
    public BarberProfileResponse createBarberProfile(BarberProfile profile, UserPrincipal userPrincipal) {
        User user = userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found for email: " + userPrincipal.getEmail()));

        profile.setUser(user);
        BarberProfile savedProfile = barberProfileRepository.save(profile);

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return BarberProfileResponse.builder()
                .id(savedProfile.getId())
                .userDTO(userDTO)
                .shopName(savedProfile.getShopName())
                .phoneNumber(savedProfile.getPhoneNumber())
                .address(savedProfile.getAddress())
                .city(savedProfile.getCity())
                .pinCode(savedProfile.getPinCode())
                .servicesOffered(savedProfile.getServicesOffered())
                .startingPrice(savedProfile.getStartingPrice())
                .build();
    }



    @Override
    public BarberProfileResponse updateBarberProfile(Long id, BarberProfile profile) {
        BarberProfile existing = barberProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(RESPONSE_BARBER_PROFILE_NOT_FOUND));

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
                .orElseThrow(() -> new RuntimeException(RESPONSE_BARBER_PROFILE_NOT_FOUND));

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
            throw new RuntimeException("No barber profiles found for address: " + address);
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
