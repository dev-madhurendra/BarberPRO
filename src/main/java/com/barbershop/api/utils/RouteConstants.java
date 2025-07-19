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

    String[] AUTHORIZED_AUTH_ENDPOINT = new String[]{
            "/api/v1/auth/**",
            "/api/v1/otp/**"
    };

    String BASE_ENDPOINT = "/api/v1";
    String AUTH_ENDPOINT = BASE_ENDPOINT + "/auth";
    String REGISTER_ENDPOINT = "/register";
    String LOGIN_ENDPOINT = "/login";
    String OTP_ENDPOINT = "/api/v1/otp";
    String SEND_OTP = "/send";
    String VERIFY_OTP = "/verify";

    String PARAM_MEDIUM = "medium";
    String PARAM_DESTINATION = "destination";
    String PARAM_OTP = "otp";

}
