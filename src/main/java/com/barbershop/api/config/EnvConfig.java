package com.barbershop.api.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class EnvConfig {

    @PostConstruct
    public void loadEnvVariables() throws IOException {
        Path envPath = Paths.get(".env");
        if (Files.exists(envPath)) {
            Files.lines(envPath)
                    .filter(line -> !line.startsWith("#") && line.contains("="))
                    .forEach(line -> {
                        String[] parts = line.split("=", 2);
                        System.setProperty(parts[0].trim(), parts[1].trim());
                    });
        }
    }
}
