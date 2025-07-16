package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP for Barber Shop Verification");
        message.setText("Dear User,\n\nYour OTP is: " + otp + "\n\nThis OTP is valid for 10 minutes.\n\nThank you!");
        mailSender.send(message);
    }
}
