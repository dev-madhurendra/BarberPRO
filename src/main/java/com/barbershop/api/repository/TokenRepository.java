package com.barbershop.api.repository;

import com.barbershop.api.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {}
