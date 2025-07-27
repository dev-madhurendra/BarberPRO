package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.dto.response.VerificationResponse;
import com.barbershop.api.entity.User;
import com.barbershop.api.exception.AppException;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.security.CustomUserDetailsService;
import com.barbershop.api.security.JwtProvider;
import com.barbershop.api.security.UserPrincipal;
import com.barbershop.api.service.EmailService;
import com.barbershop.api.service.OtpService;
import com.barbershop.api.utils.OtpUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.barbershop.api.utils.ExceptionConstants.USER_NOT_FOUND_WITH_EMAIL;
import static com.barbershop.api.utils.ResponseMessageConstants.OTP_SENT_TO_EMAIL;
import static com.barbershop.api.utils.ResponseMessageConstants.RESPONSE_MESSAGE_OTP_INVALID;

@Service
@RequiredArgsConstructor
public class EmailOtpServiceImpl implements OtpService {
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public String sendOtp(String destination) {
        User user = userRepository.findByEmail(destination)
                .orElseThrow(() -> new AppException(USER_NOT_FOUND_WITH_EMAIL + destination));

        String otp = OtpUtils.generateOtp();

        emailService.sendOtpEmail(destination, otp);
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        return OTP_SENT_TO_EMAIL + destination;
    }

    public VerificationResponse verifyOtp(String destination, String otp) {
        User user = userRepository.findByEmail(destination)
                .orElseThrow(() -> new AppException(USER_NOT_FOUND_WITH_EMAIL + destination));

        if (user.getOtp() == null || user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new AppException(RESPONSE_MESSAGE_OTP_INVALID);
        }

        if (!user.getOtp().equals(otp)) {
            throw new AppException(RESPONSE_MESSAGE_OTP_INVALID);
        }

        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        String token = null;
        if (user.getRole().name().equalsIgnoreCase("BARBER")) {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
            token = jwtProvider.generateToken((UserPrincipal) userDetails);
        }

        return new VerificationResponse(token, true);
    }


    @Override
    public boolean supports(String medium) {
        return medium.equalsIgnoreCase("email");
    }

}
