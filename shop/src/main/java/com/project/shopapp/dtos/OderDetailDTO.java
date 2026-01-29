package com.project.shopapp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OderDetailDTO {
    @Min(value = 1 ,message = "order_id not negative")
    @JsonProperty("order_id")
    private Long orderId ;

    @Min(value = 1 ,message = "product_id not negative")
    @JsonProperty("product_id")
    private Long productId ;

    private Float price ;
    @Min(value = 1 ,message = "number_of_product not negative")
    @JsonProperty("number_of_product")
    private Long numberOfProducts ;
    @Min(value = 1 ,message = "total_monney not negative")
    @JsonProperty("total_monney")
    private Float totalMoney;

    @JsonProperty("color")
    private String color ;


}
