package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.entity.User;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.service.EmailService;
import com.barbershop.api.service.OtpService;
import com.barbershop.api.utils.OtpUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

import static com.barbershop.api.utils.ExceptionConstants.USER_NOT_FOUND_WITH_EMAIL;
import static com.barbershop.api.utils.ResponseMessageConstants.OTP_SENT_TO_EMAIL;

@Service
@RequiredArgsConstructor
public class EmailOtpServiceImpl implements OtpService {
    private final EmailService emailService;
    private final UserRepository userRepository;

    @Override
    public String sendOtp(String destination) {
        User user = userRepository.findByEmail(destination)
                .orElseThrow(() -> new RuntimeException(USER_NOT_FOUND_WITH_EMAIL + destination));

        String otp = OtpUtils.generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        emailService.sendOtpEmail(destination, otp);

        return OTP_SENT_TO_EMAIL + destination;
    }

    @Override
    public boolean verifyOtp(String destination, String otp) {
        User user = userRepository.findByEmail(destination)
                .orElseThrow(() -> new RuntimeException(USER_NOT_FOUND_WITH_EMAIL + destination));

        if (user.getOtp() == null || user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return false;
        }

        if (user.getOtp().equals(otp)) {
            user.setVerified(true);
            user.setOtp(null);
            user.setOtpExpiry(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean supports(String medium) {
        return medium.equalsIgnoreCase("email");
    }

}
