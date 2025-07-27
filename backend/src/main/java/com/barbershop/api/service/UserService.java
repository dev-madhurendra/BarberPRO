package com.barbershop.api.service;

import com.barbershop.api.dto.response.UserDTO;

public interface UserService {
    UserDTO isUserExists(String email);
}
