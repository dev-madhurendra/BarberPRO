package com.barbershop.api.scheduled;

import com.barbershop.api.entity.User;
import com.barbershop.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OtpCleanupService {

    private final UserRepository userRepository;

    @Scheduled(fixedRate = 360000)
    public void clearExpiredOtps() {
        List<User> users = userRepository.findAllByOtpExpiryBefore(LocalDateTime.now());
        for (User user : users) {
            user.setOtp(null);
            user.setOtpExpiry(null);
            userRepository.save(user);
        }
    }
}
