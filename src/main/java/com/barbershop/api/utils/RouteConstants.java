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

    String AUTHORIZED_AUTH_ENDPOINT = "/api/v1/auth/**";

    String BASE_ENDPOINT = "/api/v1";
    String AUTH_ENDPOINT = BASE_ENDPOINT + "/auth";
    String REGISTER_ENDPOINT = "/register";
    String LOGIN_ENDPOINT = "/login";
    String OTP_ENDPOINT = "/api/v1/otp";
    String SEND_OTP = "/send";
    String VERIFY_OTP = "/verify";


}
