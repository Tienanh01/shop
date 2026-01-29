package com.project.shopapp.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "token" ,nullable = false)
    private  String token;
    @Column(name = "token_type")
    private String tokenType;
    @Column(name = "expiration_date")
    private Date expirationDate;
    @Column(name = "revoked")
    private Boolean revoked;
    @Column(name = "expired")
    private Boolean expired;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
