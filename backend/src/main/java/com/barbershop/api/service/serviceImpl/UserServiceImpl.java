package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.dto.response.UserDTO;
import com.barbershop.api.entity.User;
import com.barbershop.api.exception.AppException;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDTO isUserExists(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        return userOptional.map(user ->
                UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .build()
        ).orElseThrow(() -> new AppException("User Not Found"));
    }
}
