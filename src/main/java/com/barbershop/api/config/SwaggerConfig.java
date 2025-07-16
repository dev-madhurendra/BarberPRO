package com.barbershop.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.barbershop.api.utils.SwaggerConstants.*;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title(SWAGGER_TITLE)
                        .version(SWAGGER_VERSION)
                        .description(SWAGGER_DESCRIPTION)
                );
    }
}
