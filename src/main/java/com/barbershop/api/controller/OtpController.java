package com.barbershop.api.controller;

import com.barbershop.api.dto.response.ApiResponse;
import com.barbershop.api.service.OtpServiceFactory;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.barbershop.api.utils.RouteConstants.*;

@RestController
@RequestMapping(value = OTP_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "OTP Management", description = "Endpoints for sending and verifying OTPs via Email or SMS")
public class OtpController {

    private final OtpServiceFactory otpServiceFactory;

    @PostMapping(SEND_OTP)
    @Operation(
            summary = "Send OTP",
            description = "Sends an OTP to the specified destination (Email or SMS).",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OTP sent successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class))),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request")
            }
    )
    public ResponseEntity<ApiResponse<Void>> sendOtp(@RequestParam String medium, @RequestParam String destination) {
        otpServiceFactory.getOtpService(medium).sendOtp(destination);
        return ResponseEntity.ok(ApiResponse.success("OTP sent successfully to " + destination));
    }

    @PostMapping(VERIFY_OTP)
    @Operation(
            summary = "Verify OTP",
            description = "Verifies the OTP sent to the specified destination.",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OTP verified successfully",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class))),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid or expired OTP")
            }
    )
    public ResponseEntity<ApiResponse<Void>> verifyOtp(
            @RequestParam String medium,
            @RequestParam String destination,
            @RequestParam String otp) {

        boolean success = otpServiceFactory.getOtpService(medium).verifyOtp(destination, otp);
        return success
                ? ResponseEntity.ok(ApiResponse.success("OTP verified successfully"))
                : ResponseEntity.badRequest().body(ApiResponse.failure("Invalid or expired OTP"));
    }
}
