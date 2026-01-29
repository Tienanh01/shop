package com.project.shopapp.Service;

import com.project.shopapp.dtos.LoginResponse;
import com.project.shopapp.dtos.UserDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.models.User;

public interface IUserService {
    User createUser(UserDTO userDTO);

    LoginResponse login(String phoneNumber, String password) throws DataNotFoundException;
}
