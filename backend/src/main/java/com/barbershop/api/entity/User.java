package com.barbershop.api.entity;

import com.barbershop.api.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import static com.barbershop.api.utils.RouteConstants.PARAM_OTP;
import static com.barbershop.api.utils.ValidationConstants.IS_VERIFIED;
import static com.barbershop.api.utils.ValidationConstants.OTP_EXPIRY;

@Entity
@Table(name = "t_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = IS_VERIFIED)
    private boolean isVerified = false;

    @Column(name = PARAM_OTP)
    private String otp;

    @Column(name = OTP_EXPIRY)
    private LocalDateTime otpExpiry;

}
