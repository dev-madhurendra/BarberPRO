package com.barbershop.api.entity;

import com.barbershop.api.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import static com.barbershop.api.utils.RouteConstants.PARAM_OTP;
import static com.barbershop.api.utils.ValidationConstants.*;

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

    @Column(name = IS_BARBER_PROFILE_UPDATED, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isBarberProfileUpdated = false;

    @Column(name = PARAM_OTP)
    private String otp;

    @Column(name = OTP_EXPIRY)
    private LocalDateTime otpExpiry;

}
