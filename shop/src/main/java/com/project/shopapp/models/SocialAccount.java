package com.project.shopapp.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "social_account")
public class SocialAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String provider;
    @Column(name = "provider_id")
    private String providerId;
    @Column(name = "email")
    private String email;
    @Column(name = "name")
    private String name;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
