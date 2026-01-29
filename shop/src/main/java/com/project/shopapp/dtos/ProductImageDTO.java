package com.project.shopapp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.shopapp.models.Product;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProductImageDTO {

    @JsonProperty( "product_id")
    private Product product;

    @Size(min = 5 , max = 2000 ,message = "image's Name ")
    @JsonProperty("image_url")
    private String imageURL ;
}
