package com.barbershop.api.controller;

import com.barbershop.api.dto.response.ApiResponse;
import com.barbershop.api.dto.response.BarberProfileResponse;
import com.barbershop.api.entity.BarberProfile;
import com.barbershop.api.security.UserPrincipal;
import com.barbershop.api.service.BarberProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.barbershop.api.utils.RouteConstants.*;
import static com.barbershop.api.utils.SwaggerConstants.*;
import static com.barbershop.api.utils.ResponseCodeConstants.*;
import static com.barbershop.api.utils.ResponseMessageConstants.*;

@RestController
@RequestMapping(value = BASE_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = TAG_BARBER_PROFILE_NAME, description = TAG_BARBER_PROFILE_DESCRIPTION)
public class BarberProfileController {

    private final BarberProfileService barberProfileService;

    @PostMapping(CREATE_BARBER)
    @Operation(
            summary = SUMMARY_CREATE_BARBER,
            description = DESCRIPTION_CREATE_BARBER,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = RESPONSE_BARBER_CREATED,
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ApiResponse.class))
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_400, description = DESCRIPTION_INVALID_REQUEST)
            }
    )
    public ResponseEntity<ApiResponse<BarberProfileResponse>> create(@RequestBody BarberProfile profile,
                                                             @AuthenticationPrincipal UserPrincipal userPrincipal) {
        BarberProfileResponse createdProfile = barberProfileService.createBarberProfile(profile, userPrincipal);
        return ResponseEntity.ok(ApiResponse.success(RESPONSE_BARBER_CREATED, createdProfile));
    }


    @PutMapping(BARBER_ID)
    @Operation(
            summary = SUMMARY_UPDATE_BARBER,
            description = DESCRIPTION_UPDATE_BARBER,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = RESPONSE_BARBER_UPDATED,
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ApiResponse.class))
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_400, description = DESCRIPTION_INVALID_REQUEST)
            }
    )
    public ResponseEntity<ApiResponse<BarberProfileResponse>> update(@PathVariable Long id, @RequestBody BarberProfile profile) {
        BarberProfileResponse updatedProfile = barberProfileService.updateBarberProfile(id, profile);
        return ResponseEntity.ok(ApiResponse.success(RESPONSE_BARBER_UPDATED, updatedProfile));
    }

    @GetMapping(BARBER_ID)
    @Operation(
            summary = SUMMARY_GET_BARBER,
            description = DESCRIPTION_GET_BARBER,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = RESPONSE_BARBER_FETCHED,
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ApiResponse.class))
                    ),
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_400, description = DESCRIPTION_INVALID_REQUEST)
            }
    )
    public ResponseEntity<ApiResponse<BarberProfileResponse>> get(@PathVariable Long id) {
        BarberProfileResponse profile = barberProfileService.getBarberProfile(id);
        return ResponseEntity.ok(ApiResponse.success(RESPONSE_BARBER_FETCHED, profile));
    }

    @GetMapping(SEARCH_BARBER)
    @Operation(
            summary = SUMMARY_SEARCH_BARBER,
            description = DESCRIPTION_SEARCH_BARBER,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = RESPONSE_BARBER_SEARCHED,
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ApiResponse.class))
                    )
            }
    )
    public ResponseEntity<ApiResponse<List<BarberProfileResponse>>> search(@RequestParam String address) {
        List<BarberProfileResponse> barbers = barberProfileService.searchBarbersByAddress(address);
        return ResponseEntity.ok(ApiResponse.success(RESPONSE_BARBER_SEARCHED, barbers));
    }

    @DeleteMapping(BARBER_ID)
    @Operation(
            summary = SUMMARY_DELETE_BARBER,
            description = DESCRIPTION_DELETE_BARBER,
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = RESPONSE_BARBER_DELETED
                    )
            }
    )
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        barberProfileService.deleteBarberProfile(id);
        return ResponseEntity.ok(ApiResponse.success(RESPONSE_BARBER_DELETED));
    }
}
