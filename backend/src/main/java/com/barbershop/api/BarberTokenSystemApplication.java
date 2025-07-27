package com.barbershop.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BarberTokenSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BarberTokenSystemApplication.class, args);
	}

}
