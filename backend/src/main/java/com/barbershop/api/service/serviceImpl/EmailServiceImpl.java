package com.barbershop.api.service.serviceImpl;

import com.barbershop.api.exception.AppException;
import com.barbershop.api.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import static com.barbershop.api.utils.EmailTemplateConstants.HTML_EMAIL_TEMPLATE;
import static com.barbershop.api.utils.EmailTemplateConstants.YOUR_OTP_VERIFICATION;
import static com.barbershop.api.utils.ExceptionConstants.FAILED_TO_SEND_TOP;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String to, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(YOUR_OTP_VERIFICATION);

            String htmlContent = HTML_EMAIL_TEMPLATE.formatted(otp);

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new AppException(FAILED_TO_SEND_TOP);
        }
    }
}
