package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.dto.request.LoginRequest;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.request.ResetPasswordRequest;
import com.barbershop.api.dto.response.BarberDTO;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.response.RegisterResponse;
import com.barbershop.api.dto.response.UserDTO;
import com.barbershop.api.entity.User;
import com.barbershop.api.enums.Role;
import com.barbershop.api.exception.AppException;
import com.barbershop.api.exception.ResourceNotFound;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.security.JwtProvider;
import com.barbershop.api.security.UserPrincipal;
import com.barbershop.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.barbershop.api.utils.ExceptionConstants.EMAIL_ALREADY_REGISTERED;
import static com.barbershop.api.utils.ExceptionConstants.USER_NOT_FOUND;
import static com.barbershop.api.utils.ValidationConstants.USER_REGISTERED_SUCCESSFULLY;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(EMAIL_ALREADY_REGISTERED);
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return new RegisterResponse(USER_REGISTERED_SUCCESSFULLY);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        var auth = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        authenticationManager.authenticate(auth);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(USER_NOT_FOUND));

        String token = jwtProvider.generateToken(new UserPrincipal(user, user.isBarberProfileUpdated()));

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return new LoginResponse(token, userDTO);
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFound("User not found with email " + request.getEmail()));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public UserDTO updateRoleAsBarber(String token, String newRole) {
        String email = jwtProvider.extractUsername(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        log.info(">> Role is updating from {} to {}", user.getRole(), newRole);
        user.setRole(Role.valueOf(newRole.toUpperCase()));
        user.setVerified(true);
        User updatedRoleUser = userRepository.save(user);
        return UserDTO.builder()
                .id(updatedRoleUser.getId())
                .name(updatedRoleUser.getName())
                .email(updatedRoleUser.getEmail())
                .role(updatedRoleUser.getRole())
                .build();
    }

    @Override
    public UserDTO getCurrentUser(String token) {
        String email = jwtProvider.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();;

        if (userDTO.getRole() == Role.BARBER) {
            userDTO =  BarberDTO.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .isBarberProfileUpdated(user.isBarberProfileUpdated())
                    .build();;
        }

        return userDTO;
    }


}