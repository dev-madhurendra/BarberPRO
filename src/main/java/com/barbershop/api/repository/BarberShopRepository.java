package com.barbershop.api.repository;

import com.barbershop.api.entity.BarberShop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BarberShopRepository extends JpaRepository<BarberShop, Long> {}
