package com.barbershop.api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "t_barber_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BarberProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String shopName;
    private String phoneNumber;
    private String address;
    private String city;
    private String pinCode;
    private String servicesOffered;
    private Double startingPrice;

    private boolean isApproved = false;
}
