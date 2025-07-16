package com.barbershop.api;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(info = @Info(title = "Barber Shop API", version = "1.0", description = "API documentation for Barber Shop"))
@SpringBootApplication
public class BarberTokenSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BarberTokenSystemApplication.class, args);
	}

}
