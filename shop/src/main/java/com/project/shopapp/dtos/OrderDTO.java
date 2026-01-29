package com.project.shopapp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDTO {
    @Min(value = 1 ,message = "user id must be positive")
@JsonProperty("user_id")
    private Long userId;

@JsonProperty("fullname")
    private String fullName ;

private String email ;
@NotBlank(message = "Phone number must be at least 5 charactors ")
@JsonProperty("phone_number")
private String phoneNumber;

private String address ;

private String note ;
@JsonProperty("total_money")
private Float totalMoney ;
@JsonProperty("shipping_method")
private String shippingMethod ;
//@JsonProperty("shopping_address")
//private String shoppingAddress;
@JsonProperty("payment_method")
private String paymentMethod ;

}
