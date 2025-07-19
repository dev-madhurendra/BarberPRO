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

import static com.barbershop.api.utils.ResponseCodeConstants.RESPONSE_200;
import static com.barbershop.api.utils.ResponseCodeConstants.RESPONSE_400;
import static com.barbershop.api.utils.ResponseMessageConstants.*;
import static com.barbershop.api.utils.RouteConstants.*;
import static com.barbershop.api.utils.SwaggerConstants.*;

@RestController
@RequestMapping(value = OTP_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = TAG_OTP_MANAGEMENT_NAME, description = TAG_OTP_MANAGEMENT_DESCRIPTION)
public class OtpController {

    private final OtpServiceFactory otpServiceFactory;

    @PostMapping(SEND_OTP)
    @Operation(
            summary = SUMMARY_SEND_OTP,
            description = DESCRIPTION_SEND_OTP,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_200, description = DESCRIPTION_OTP_SENT_SUCCESS,
                            content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_400, description = DESCRIPTION_INVALID_REQUEST)
            }
    )
    public ResponseEntity<ApiResponse<Void>> sendOtp(
            @RequestParam(name = PARAM_MEDIUM) String medium,
            @RequestParam(name = PARAM_DESTINATION) String destination) {

        otpServiceFactory.getOtpService(medium).sendOtp(destination);
        return ResponseEntity.ok(ApiResponse.success(RESPONSE_MESSAGE_OTP_SENT + destination));
    }

    @PostMapping(VERIFY_OTP)
    @Operation(
            summary = SUMMARY_VERIFY_OTP,
            description = DESCRIPTION_VERIFY_OTP,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_200, description = DESCRIPTION_OTP_VERIFIED_SUCCESS,
                            content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_400, description = DESCRIPTION_INVALID_OR_EXPIRED_OTP)
            }
    )
    public ResponseEntity<ApiResponse<Void>> verifyOtp(
            @RequestParam(name = PARAM_MEDIUM) String medium,
            @RequestParam(name = PARAM_DESTINATION) String destination,
            @RequestParam(name = PARAM_OTP) String otp) {

        boolean success = otpServiceFactory.getOtpService(medium).verifyOtp(destination, otp);
        return success
                ? ResponseEntity.ok(ApiResponse.success(RESPONSE_MESSAGE_OTP_VERIFIED))
                : ResponseEntity.badRequest().body(ApiResponse.failure(RESPONSE_MESSAGE_OTP_INVALID));
    }
}
