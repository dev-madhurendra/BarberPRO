package com.barbershop.api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "t_barber_shop")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BarberShop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String phone;

    @OneToOne
    private User barber;
}
