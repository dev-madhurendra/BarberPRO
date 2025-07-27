package com.barbershop.api.utils;

public interface SwaggerConstants {

    // ===== API Documentation Info =====
    String SWAGGER_TITLE = "Barber Shop API";
    String SWAGGER_DESCRIPTION = "API documentation for the Barber Shop application.";
    String SWAGGER_VERSION = "1.0.0";

    // ===== Contact Info =====
    String SWAGGER_CONTACT_NAME = "Madhurendra Nath Tiwari";
    String SWAGGER_CONTACT_EMAIL = "dev.madhurendra@gmail.com";
    String SWAGGER_CONTACT_URL = "https://your-portfolio.com";

    // ===== License Info =====
    String SWAGGER_LICENSE_NAME = "Apache 2.0";
    String SWAGGER_LICENSE_URL = "https://www.apache.org/licenses/LICENSE-2.0.html";

    // ===== Media Types =====
    String MEDIA_TYPE_JSON = "application/json";

    // ===== Tags =====
    String TAG_AUTH_MANAGEMENT_NAME = "Auth Management";
    String TAG_AUTH_MANAGEMENT_DESC = "Endpoints for managing authentication";

    String TAG_OTP_MANAGEMENT_NAME = "OTP Management";
    String TAG_OTP_MANAGEMENT_DESCRIPTION = "Endpoints for sending and verifying OTPs via Email or SMS";

    String TAG_BARBER_PROFILE_NAME = "Barber Profile Management";
    String TAG_BARBER_PROFILE_DESCRIPTION = "APIs for managing barber profiles";

    // ===== Auth Summaries & Descriptions =====
    String REGISTER_SUMMARY = "Register";
    String REGISTER_DESCRIPTION = "Registers a new user.";

    String LOGIN_SUMMARY = "Login";
    String LOGIN_DESCRIPTION = "Authenticates a user and returns a JWT token.";

    // ===== OTP Summaries & Descriptions =====
    String SUMMARY_SEND_OTP = "Send OTP";
    String DESCRIPTION_SEND_OTP = "Sends an OTP to the specified destination (Email or SMS).";

    String SUMMARY_VERIFY_OTP = "Verify OTP";
    String DESCRIPTION_VERIFY_OTP = "Verifies the OTP sent to the specified destination.";

    // ===== Barber Profile Summaries =====
    String SUMMARY_CREATE_BARBER = "Create Barber Profile";
    String SUMMARY_UPDATE_BARBER = "Update Barber Profile";
    String SUMMARY_GET_BARBER = "Get Barber Profile by ID";
    String SUMMARY_SEARCH_BARBER = "Search Barbers by Address";
    String SUMMARY_DELETE_BARBER = "Delete Barber Profile";

    // ===== Barber Profile Descriptions =====
    String DESCRIPTION_CREATE_BARBER = "Add a new barber profile with details like shop name, address, and services.";
    String DESCRIPTION_UPDATE_BARBER = "Update existing barber profile details.";
    String DESCRIPTION_GET_BARBER = "Retrieve details of a barber profile by its ID.";
    String DESCRIPTION_SEARCH_BARBER = "Search barbers by matching the provided address.";
    String DESCRIPTION_DELETE_BARBER = "Delete a barber profile based on its ID.";

    String RESET_PASSWORD_SUMMARY = "Reset Password";
    String RESET_PASSWORD_DESCRIPTION = "Reset the user's password using email and OTP";

    String GOOGLE_LOGIN_SUMMARY = "Google OAuth2 Login";
    String GOOGLE_LOGIN_DESCRIPTION = "Authenticate user via Google OAuth2 with optional role selection";
    String INVALID_ROLE_OR_TOKEN = "Invalid role or token";
    String USER_EMAIL_GOOGLE_OAUTH_2 = "User's email from Google OAuth2";
    String USER_NAME_GOOGLE_OAUTH_2 = "User's name from Google OAuth2";
    String USER_ROLES = "User's role (CUSTOMER, BARBER, ADMIN)";
    String CUSTOMER = "CUSTOMER";
    String CHANGE_ROLE_SUMMARY = "Change Role";
}
