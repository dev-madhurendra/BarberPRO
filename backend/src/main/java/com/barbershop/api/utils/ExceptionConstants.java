package com.barbershop.api.utils;

public interface ExceptionConstants {
    String RESOURCE_NOT_FOUND = "Resource Not Found: ";
    String VALIDATION_FAILED = "Validation Failed";
    String INTERNAL_SERVER_ERROR = "Internal Server Error: ";
    String INVALID_EMAIL_OR_PASSWORD = "Invalid email or password";
    String USER_NOT_FOUND_WITH_EMAIL = "User not found with email: ";
    String EMAIL_ALREADY_REGISTERED = "Email is already registered.";
    String USER_NOT_FOUND = "User not found";
    String FAILED_TO_SEND_TOP = "Failed to send OTP email";
    String NO_OTP_SVC_FOUND = "No OTP service found for medium: ";
}
