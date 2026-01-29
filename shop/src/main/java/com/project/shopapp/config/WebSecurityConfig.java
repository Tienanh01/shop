package com.project.shopapp.config;

import com.project.shopapp.Repository.RoleRepository;
import com.project.shopapp.Repository.UserRepository;
import com.project.shopapp.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity // (1)
public class WebSecurityConfig  { // (1)
    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    private UserRepository userRepository ;

    public static final String[] PUBLIC_PATHS = {"/api/auth/**",
            "/api/v1/roles/getlist",
            "/v3/api-docs.yaml",
            "/v3/**",
            "/swagger-ui/**","/api/v1/users/register",
            "/api/v1/users/getUser",
            "/api/v1/users/login",
            "/v3/api-docs/swagger-config",
            "/v3/api-docs",
            "/swagger-ui.html",
            "/uploads/**",
    "/users/login"};

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                       .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(PUBLIC_PATHS).permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        // ❌ Chặn GET đến /admin/**
                        .requestMatchers(HttpMethod.GET, "/admin/**").authenticated()

                        // ✅ Cho phép mọi GET khác
                        .requestMatchers(HttpMethod.GET, "/**").permitAll()

                        // Các request còn lại thì cần đăng nhập
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));   // ⭐ cho phép mọi origin
        config.setAllowedMethods(List.of("*"));          // ⭐ GET/POST/PUT/DELETE/OPTIONS
        config.setAllowedHeaders(List.of("*"));          // ⭐ mọi header
        config.setAllowCredentials(true);                // ⭐ nếu có cookie/token

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

//    @Bean
//    public InMemoryUserDetailsManager userDetailsService() {
//        UserDetails user = User.withDefaultPasswordEncoder()
//                .username("user1234")
//                .password("password5678")
//                .roles("USER")
//                .build();
//
//        UserDetails admin = User.withDefaultPasswordEncoder()
//                .username("admin1234")
//                .password("password5678")
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(user, admin);
//    }
//@Bean
//public UserDetailsService userDetailsService() {
//
//        String phonenumber ="String";
//
//    com.project.shopapp.models.User user =  (userRepository.findByPhoneNumber(phonenumber)).get();
//
//    UserDetails userDetails = User.withDefaultPasswordEncoder()
//            .username(user.getPhoneNumber())
//            .password(user.getPassword())
//            .roles(user.getRole().getName())
//            .build();
//
//    return new InMemoryUserDetailsManager(userDetails);
//}


}
