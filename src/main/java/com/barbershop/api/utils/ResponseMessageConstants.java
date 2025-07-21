package com.barbershop.api.utils;

public interface ResponseMessageConstants {
    String REGISTER_SUCCESS_MESSAGE = "User registered successfully";
    String LOGIN_SUCCESS_MESSAGE = "Login successful";
    String DESCRIPTION_REGISTRATION_SUCCESSFUL = "Registration successful";
    String DESCRIPTION_INVALID_INPUT = "Invalid input";
    String DESCRIPTION_LOGIN_SUCCESSFUL = "Login successful";
    String DESCRIPTION_INVALID_CREDENTIALS = "Invalid credentials";

    String DESCRIPTION_OTP_SENT_SUCCESS = "OTP sent successfully";
    String DESCRIPTION_INVALID_REQUEST = "Invalid request";
    String DESCRIPTION_OTP_VERIFIED_SUCCESS = "OTP verified successfully";
    String DESCRIPTION_INVALID_OR_EXPIRED_OTP = "Invalid or expired OTP";
    String RESPONSE_MESSAGE_OTP_SENT = "OTP sent successfully to ";
    String RESPONSE_MESSAGE_OTP_VERIFIED = "OTP verified successfully";
    String RESPONSE_MESSAGE_OTP_INVALID = "Invalid or expired OTP";
    String RESPONSE_OTP_VERIFIED_BARBER_REGISTER = "OTP Verified! Barber login token generated.";

    String OTP_SENT_TO_EMAIL = "OTP sent to email: ";

    String RESPONSE_BARBER_CREATED = "Barber profile created successfully.";
    String RESPONSE_BARBER_UPDATED = "Barber profile updated successfully.";
    String RESPONSE_BARBER_FETCHED = "Barber profile retrieved successfully.";
    String RESPONSE_BARBER_SEARCHED = "Barbers found successfully.";
    String RESPONSE_BARBER_DELETED = "Barber profile deleted successfully.";
    String RESPONSE_BARBER_PROFILE_NOT_FOUND = "Barber profile not found";
}
