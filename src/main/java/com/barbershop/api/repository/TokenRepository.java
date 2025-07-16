package com.barbershop.api.repository;

import com.barbershop.api.entity.BarberShop;
import com.barbershop.api.entity.Token;
import com.barbershop.api.entity.TokenStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByShopAndDateAndStatus(BarberShop shop, LocalDate date, TokenStatus status);
    int countByShopAndDate(BarberShop shop, LocalDate date);
}
