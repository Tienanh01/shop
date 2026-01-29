package com.project.shopapp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
@ManyToOne
@JoinColumn(name = "user_id")
    private User user;
@Column(name = "fullname")
private String fullName ;
@Column(name = "email")
private String email ;
@Column(name = "phone_number")
private String phoneNumber;
@Column(name = "address")
private String address ;
@Column(name = "note")
private String note ;
@Column(name = "order_date")
private Date orderDate ;
@Column(name = "status")
private String status;
@Column(name = "total_money")
private Float totalMoney ;

@Column(name = "shipping_method")
private String shippingMethod ;
@Column(name = "shipping_address")
private String shippingAddress ;
@Column(name = "shipping_date")
private Date shippingDate ;

@Column(name = "shipping_number")
private  String shippingNumber ;

@Column(name = "payment_method")
private String paymentMethod;
@Column(name = "active")
private boolean active ;



}
