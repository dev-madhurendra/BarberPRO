package com.barbershop.api.entity;

import com.barbershop.api.enums.TokenStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_token")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer tokenNumber;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private TokenStatus status;

    @ManyToOne
    private User customer;

    @ManyToOne
    private BarberProfile barberProfile;

    private LocalDateTime requestedAt;

    private LocalDateTime servedAt;
}

