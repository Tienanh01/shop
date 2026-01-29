package com.project.shopapp.controllers;

import com.project.shopapp.Repository.RoleRepository;
import com.project.shopapp.Repository.UserRepository;
import com.project.shopapp.Service.UserService;
import com.project.shopapp.dtos.LoginResponse;
import com.project.shopapp.dtos.UserDTO;
import com.project.shopapp.dtos.UserLoginDTO;
import com.project.shopapp.dtos.UserResponseDto;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.models.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository ;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserDTO userDTO,
            BindingResult result
    ) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage).collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errorMessages);
            }
            if (!userDTO.getPassword().equals(userDTO.getRetypePassword())) {
                return ResponseEntity.badRequest().body("Password does not match");
            }
            userService.createUser(userDTO);

            return ResponseEntity.ok("Register successfully");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public LoginResponse login(
             @RequestBody UserLoginDTO userLoginDTO) throws DataNotFoundException {
        // Kiểm tra thông tin đăng nhập và sinh token
        // Trả về token trong response
        try {
            LoginResponse loginInfo = userService.login(userLoginDTO.getPhoneNumber(),userLoginDTO.getPassword());
        return  loginInfo ;
        }catch (Exception e){
            throw new DataNotFoundException("Invalid phone number or password");
        }

//        return new LoginResponse();
    }
    @GetMapping("/getUser")
    public Object userList(){
        return userRepository.findAll();

    }

    @GetMapping("/getUserByUserName")
    public Object userList(@RequestParam("phone") String phonenumber){
        return userRepository.findByPhoneNumber(phonenumber);

    }
}
