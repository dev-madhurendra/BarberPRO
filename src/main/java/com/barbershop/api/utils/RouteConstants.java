package com.barbershop.api.utils;

public interface RouteConstants {

    String[] SWAGGER_ENDPOINTS = new String[]{
        "/swagger-ui/**",
        "/swagger-ui.html",
        "/v3/api-docs/**",
        "/api-docs/**",
        "/swagger-resources/**",
        "/webjars/**"
    };

    String AUTH_ENDPOINT = "/api/v1/auth/**";
    String REGISTER_ENDPOINT = "/register";
    String LOGIN_ENDPOINT = "/login";


}
