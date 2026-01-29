package com.project.shopapp.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class IdPayLoadDTO {
    @NotNull(message = "ProductId cannot be null")
    @Positive(message = "ProductId must be a positive number")
    private Long id;
}
