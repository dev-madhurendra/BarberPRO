package com.barbershop.api.utils;

public interface SwaggerConstants {
    String SWAGGER_TITLE = "Barber Shop API";
    String SWAGGER_DESCRIPTION = "API documentation for the Barber Shop application.";
    String SWAGGER_VERSION = "1.0.0";

    String SWAGGER_CONTACT_NAME = "Madhurendra Nath Tiwari";
    String SWAGGER_CONTACT_EMAIL = "dev.madhurendra@gmail.com";
    String SWAGGER_CONTACT_URL = "https://your-portfolio.com";

    String SWAGGER_LICENSE_NAME = "Apache 2.0";
    String SWAGGER_LICENSE_URL = "https://www.apache.org/licenses/LICENSE-2.0.html";

    String REGISTER_SUMMARY = "Register";
    String REGISTER_DESCRIPTION = "Registers a new user.";

    String LOGIN_SUMMARY = "Login";
    String LOGIN_DESCRIPTION = "Authenticates a user and returns a JWT token.";

    String TAG_AUTH_MANAGEMENT_NAME = "Auth Management";
    String TAG_AUTH_MANAGEMENT_DESC = "Endpoints for managing authentication";

    String MEDIA_TYPE_JSON = "application/json";

    String TAG_OTP_MANAGEMENT_NAME = "OTP Management";
    String TAG_OTP_MANAGEMENT_DESCRIPTION = "Endpoints for sending and verifying OTPs via Email or SMS";

    String SUMMARY_SEND_OTP = "Send OTP";
    String DESCRIPTION_SEND_OTP = "Sends an OTP to the specified destination (Email or SMS).";

    String SUMMARY_VERIFY_OTP = "Verify OTP";
    String DESCRIPTION_VERIFY_OTP = "Verifies the OTP sent to the specified destination.";

}
