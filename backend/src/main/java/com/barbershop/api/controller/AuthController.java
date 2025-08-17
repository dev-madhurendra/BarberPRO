package com.barbershop.api.controller;

import static com.barbershop.api.utils.ResponseCodeConstants.RESPONSE_200;
import static com.barbershop.api.utils.ResponseCodeConstants.RESPONSE_400;
import static com.barbershop.api.utils.ResponseCodeConstants.RESPONSE_401;
import static com.barbershop.api.utils.ResponseMessageConstants.CHANGE_ROLE_DESCRIPTION;
import static com.barbershop.api.utils.ResponseMessageConstants.CHANGE_ROLE_SUCCESS_MESSAGE;
import static com.barbershop.api.utils.ResponseMessageConstants.DESCRIPTION_INVALID_CREDENTIALS;
import static com.barbershop.api.utils.ResponseMessageConstants.DESCRIPTION_INVALID_INPUT;
import static com.barbershop.api.utils.ResponseMessageConstants.DESCRIPTION_LOGIN_SUCCESSFUL;
import static com.barbershop.api.utils.ResponseMessageConstants.DESCRIPTION_REGISTRATION_SUCCESSFUL;
import static com.barbershop.api.utils.ResponseMessageConstants.LOGIN_SUCCESS_MESSAGE;
import static com.barbershop.api.utils.ResponseMessageConstants.REGISTER_SUCCESS_MESSAGE;
import static com.barbershop.api.utils.ResponseMessageConstants.RESET_PASSWORD_INVALID_REQUEST;
import static com.barbershop.api.utils.ResponseMessageConstants.RESET_PASSWORD_SUCCESS_MESSAGE;
import static com.barbershop.api.utils.RouteConstants.AUTH_ENDPOINT;
import static com.barbershop.api.utils.RouteConstants.CHANGE_ROLE_ENDPOINT;
import static com.barbershop.api.utils.RouteConstants.LOGIN_ENDPOINT;
import static com.barbershop.api.utils.RouteConstants.REGISTER_ENDPOINT;
import static com.barbershop.api.utils.RouteConstants.RESET_PASSWORD_ENDPOINT;
import static com.barbershop.api.utils.SwaggerConstants.CHANGE_ROLE_SUMMARY;
import static com.barbershop.api.utils.SwaggerConstants.INVALID_ROLE_OR_TOKEN;
import static com.barbershop.api.utils.SwaggerConstants.LOGIN_DESCRIPTION;
import static com.barbershop.api.utils.SwaggerConstants.LOGIN_SUMMARY;
import static com.barbershop.api.utils.SwaggerConstants.MEDIA_TYPE_JSON;
import static com.barbershop.api.utils.SwaggerConstants.REGISTER_DESCRIPTION;
import static com.barbershop.api.utils.SwaggerConstants.REGISTER_SUMMARY;
import static com.barbershop.api.utils.SwaggerConstants.RESET_PASSWORD_DESCRIPTION;
import static com.barbershop.api.utils.SwaggerConstants.RESET_PASSWORD_SUMMARY;
import static com.barbershop.api.utils.SwaggerConstants.TAG_AUTH_MANAGEMENT_DESC;
import static com.barbershop.api.utils.SwaggerConstants.TAG_AUTH_MANAGEMENT_NAME;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barbershop.api.dto.request.LoginRequest;
import com.barbershop.api.dto.request.RegisterRequest;
import com.barbershop.api.dto.request.ResetPasswordRequest;
import com.barbershop.api.dto.request.UpdateRoleRequest;
import com.barbershop.api.dto.response.ApiResponse;
import com.barbershop.api.dto.response.LoginResponse;
import com.barbershop.api.dto.response.RegisterResponse;
import com.barbershop.api.dto.response.UserDTO;
import com.barbershop.api.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = AUTH_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Tag(name = TAG_AUTH_MANAGEMENT_NAME, description = TAG_AUTH_MANAGEMENT_DESC)
public class AuthController {

  private final AuthService authService;

  @PostMapping(REGISTER_ENDPOINT)
  @Operation(summary = REGISTER_SUMMARY, description = REGISTER_DESCRIPTION, responses = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_200, description = DESCRIPTION_REGISTRATION_SUCCESSFUL, content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_400, description = DESCRIPTION_INVALID_INPUT)
  })
  public ResponseEntity<ApiResponse<RegisterResponse>> register(@Valid @RequestBody RegisterRequest request) {
    RegisterResponse response = authService.register(request);
    return ResponseEntity.ok(ApiResponse.success(REGISTER_SUCCESS_MESSAGE, response));
  }

  @PostMapping(LOGIN_ENDPOINT)
  @Operation(summary = LOGIN_SUMMARY, description = LOGIN_DESCRIPTION, responses = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_200, description = DESCRIPTION_LOGIN_SUCCESSFUL, content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_401, description = DESCRIPTION_INVALID_CREDENTIALS)
  })
  public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
    LoginResponse response = authService.login(request);
    return ResponseEntity.ok(ApiResponse.success(LOGIN_SUCCESS_MESSAGE, response));
  }

  @PostMapping(RESET_PASSWORD_ENDPOINT)
  @Operation(summary = RESET_PASSWORD_SUMMARY, description = RESET_PASSWORD_DESCRIPTION, responses = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_200, description = RESET_PASSWORD_SUCCESS_MESSAGE, content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_400, description = RESET_PASSWORD_INVALID_REQUEST)
  })
  public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
    authService.resetPassword(request);
    return ResponseEntity.ok(ApiResponse.success(RESET_PASSWORD_SUCCESS_MESSAGE, null));
  }

  @PostMapping(CHANGE_ROLE_ENDPOINT)
  @Operation(summary = CHANGE_ROLE_SUMMARY, description = CHANGE_ROLE_DESCRIPTION, responses = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_200, description = CHANGE_ROLE_SUCCESS_MESSAGE, content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_400, description = INVALID_ROLE_OR_TOKEN)
  })
  public ResponseEntity<ApiResponse<UserDTO>> changeRole(
      @RequestBody UpdateRoleRequest updateRoleRequest,
      @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.replace("Bearer ", "");
    UserDTO updatedUser = authService.updateRoleAsBarber(token, updateRoleRequest.getRole());

    return ResponseEntity.ok(ApiResponse.success(CHANGE_ROLE_SUCCESS_MESSAGE, updatedUser));
  }

  @GetMapping("/me")
  @Operation(summary = "Get Authenticated User Info", description = "Returns user details based on the provided JWT token", responses = {
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_200, description = "User info retrieved successfully", content = @Content(mediaType = MEDIA_TYPE_JSON, schema = @Schema(implementation = ApiResponse.class))),
      @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = RESPONSE_401, description = "Invalid or missing token")
  })
  public ResponseEntity<ApiResponse<UserDTO>> getAuthenticatedUser(
      @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.replace("Bearer ", "");
    UserDTO userDTO = authService.getCurrentUser(token);

    return ResponseEntity.ok(ApiResponse.success("User details fetched successfully", userDTO));
  }

}
