package com.barbershop.api.config;

import com.barbershop.api.entity.User;
import com.barbershop.api.enums.Role;
import com.barbershop.api.repository.UserRepository;
import com.barbershop.api.security.JwtProvider;
import com.barbershop.api.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtProvider jwtService;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException {

    String roleParam = request.getParameter("role");

    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
    String email = oAuth2User.getAttribute("email");
    String name = oAuth2User.getAttribute("name");

    Role role;
    try {
      role = (roleParam != null && !roleParam.isBlank())
        ? Role.valueOf(roleParam.toUpperCase())
        : Role.NOT_DEFINED;
    } catch (IllegalArgumentException e) {
        role = Role.NOT_DEFINED;
    }

    Role finalRole = role;
    User user = userRepository.findByEmail(email)
      .orElseGet(() -> userRepository.save(User.builder()
        .name(name)
        .email(email)
        .role(finalRole)
        .isVerified(true)
        .build()
      ));

    UserPrincipal userPrincipal = UserPrincipal.create(user);
    String token = jwtService.generateToken(userPrincipal);

    response.sendRedirect("http://localhost:5173/oauth2/callback?token=" + token);
  }
}

