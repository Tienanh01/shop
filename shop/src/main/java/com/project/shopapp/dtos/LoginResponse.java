package com.project.shopapp.dtos;

import lombok.Data;

@Data
public class LoginResponse {

    String access_token;
    String refresh_token;
    String token_type;
    long expires_in;
    UserResponseDto user;

}
