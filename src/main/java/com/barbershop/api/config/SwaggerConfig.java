package com.barbershop.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
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
                        .description(SWAGGER_DESCRIPTION)
                        .version(SWAGGER_VERSION)
                        .contact(new Contact()
                                .name("Madhurendra Nath")
                                .email("dev.madhurendra@gmail.com")
                                .url("https://your-portfolio.com"))
                        .license(new License()
                        .name("Apache 2.0")
                        .url("https://www.apache.org/licenses/LICENSE-2.0.html"))
                );

    }
}
