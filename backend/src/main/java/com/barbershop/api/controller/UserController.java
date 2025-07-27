package com.barbershop.api.controller;

import com.barbershop.api.dto.response.ApiResponse;
import com.barbershop.api.dto.response.UserDTO;
import com.barbershop.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.barbershop.api.utils.ResponseCodeConstants.RESPONSE_200;
import static com.barbershop.api.utils.RouteConstants.USER_ENDPOINT;

@RestController
@RequestMapping(value = USER_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = "User Management", description = "Endpoints related to user info")
public class UserController {

    private final UserService userService;

    @GetMapping()
    @Operation(
            summary = "Check user existence by email",
            description = "Returns user's role if the email exists in the system",
            responses = {
                    @io.swagger.v3.oas.annotations.responses.ApiResponse(
                            responseCode = RESPONSE_200,
                            description = "User found",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ApiResponse.class))
                    )
            }
    )
    public ResponseEntity<ApiResponse<UserDTO>> checkUserByEmail(@RequestParam String email) {
        UserDTO response = userService.isUserExists(email);
        return ResponseEntity.ok(ApiResponse.success("User found", response));
    }
}
