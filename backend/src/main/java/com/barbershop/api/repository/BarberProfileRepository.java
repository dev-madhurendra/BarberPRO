package com.barbershop.api.repository;

import com.barbershop.api.entity.BarberProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BarberProfileRepository extends JpaRepository<BarberProfile, Long> {
    BarberProfile findByUserId(Long userId);
    List<BarberProfile> findByAddressContainingIgnoreCase(String address);
}
