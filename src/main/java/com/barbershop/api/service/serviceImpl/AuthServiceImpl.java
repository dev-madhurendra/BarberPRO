package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.dto.request.AuthRequest;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.response.RegisterResponse;
import com.barbershop.api.dto.response.UserDTO;
import com.barbershop.api.entity.User;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.security.JwtProvider;
import com.barbershop.api.security.UserPrincipal;
import com.barbershop.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.barbershop.api.utils.ValidationMessages.USER_REGISTERED_SUCCESSFULLY;

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
            throw new RuntimeException("Email is already registered.");
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
    public LoginResponse login(AuthRequest request) {
        var auth = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        authenticationManager.authenticate(auth);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtProvider.generateToken(new UserPrincipal(user));

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return new LoginResponse(token, userDTO);
    }


}
