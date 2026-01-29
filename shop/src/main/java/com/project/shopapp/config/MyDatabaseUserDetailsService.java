package com.project.shopapp.config;

import com.project.shopapp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class MyDatabaseUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails userDetails = (UserDetails) userRepository.findByPhoneNumber(username)
                .orElseThrow( () ->
                        new UsernameNotFoundException("Khong tim thay user") );

        System.out.println(userDetails.getUsername() + " "+userDetails.getPassword());

        return userDetails;
    }
}
