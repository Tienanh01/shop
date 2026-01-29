package com.project.shopapp.Service;

import com.project.shopapp.Repository.RoleRepository;
import com.project.shopapp.Repository.UserRepository;
//import com.project.shopapp.components.JwtTokenUtil;
import com.project.shopapp.components.JwtTokenUtil;
import com.project.shopapp.dtos.LoginResponse;
import com.project.shopapp.dtos.UserDTO;
import com.project.shopapp.dtos.UserResponseDto;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.models.Role;
import com.project.shopapp.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private  AuthenticationManager authenticationManager;



    @Override
    public User createUser(UserDTO userDTO) {
        String phoneNumber = userDTO.getPhoneNumber();
        if (userRepository.existsByPhoneNumber(phoneNumber)) {
            throw new DataIntegrityViolationException("Phone number exits ");
        }
        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .phoneNumber(userDTO.getPhoneNumber())
                .password(userDTO.getPassword())
                .address(userDTO.getAddress())
                .dateOfBirth(userDTO.getDateOfBirth())
                .facebookAccountId(userDTO.getFacebookAccountId())
                .googleAccountId(userDTO.getGoogleAccountId())
                .build();
        Role exitsRole;
        try {
            exitsRole = roleRepository.findById(userDTO.getRoleId())
                    .orElseThrow(() -> new DataNotFoundException("Role not found"));
        } catch (DataNotFoundException e) {
            throw new RuntimeException(e);
        }
        newUser.setRole(exitsRole);
        if(userDTO.getFacebookAccountId() == 0 && userDTO.getGoogleAccountId() == 0){
            String password = userDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            newUser.setPassword(encodedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public LoginResponse login(String phoneNumber, String password)
            throws DataNotFoundException {

        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() ->
                        new DataNotFoundException("Phone number or password not correct")
                );

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(phoneNumber, password)
            );
        } catch (BadCredentialsException e) {
            throw new DataNotFoundException("Phone number or password not correct");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenUtil.generateToken(user);

        UserResponseDto userDto = new UserResponseDto();
        userDto.setId(user.getId());
        userDto.setUserName(user.getPhoneNumber());
        userDto.setFullName(user.getFullName());
        userDto.setRole(user.getRole().getName());

        LoginResponse response = new LoginResponse();
        response.setAccess_token(token);
        response.setToken_type("Bearer");
        response.setRefresh_token("");
        response.setUser(userDto);

        return response;
    }

    public static void main(String[] args) {
        UserService u =     new UserService();
        System.out.println(        u.removeElement(new int[]{3,2,2,3}, 3));

                int nums[] = {0,1,2,2,3,0,4,2};
        u.removeElement(nums, 2);
        for (int n : nums){
            System.out.print(n + " ");
        }

    }

    public int removeElement(int[] nums, int val) {
        int index = 0 ;

        for(int n : nums){
            if(n != val){
                index++;
            }
        }

        for (int j = 0; j < index; j++) {
            if(nums[j] == val) {
                for(int k = nums.length ; k>j ; k-- ){
                    if(nums[k-1] != val){
                        int temp = nums[j];
                        nums[j] = nums[k-1];
                        nums[k-1] = temp;
                        break;
                    }
                }
            }
        }

       return nums.length - index;
    }

}
