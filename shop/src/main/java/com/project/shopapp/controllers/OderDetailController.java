package com.project.shopapp.controllers;

import com.project.shopapp.Service.OrderDetailService;
import com.project.shopapp.dtos.OderDetailDTO;
import com.project.shopapp.models.OrderDetails;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/order_details")
public class OderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody @Valid OderDetailDTO orderdetail ,
                                    BindingResult result){
            if(result.hasErrors()){
                List<String> errorMessage = result.getFieldErrors().stream()
                        .map(FieldError::getDefaultMessage).collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errorMessage);
            }

        OrderDetails orderDetails = orderDetailService.createOrderDetail(orderdetail);
        return  ResponseEntity.ok(orderDetails);

    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDetail (@Valid @PathVariable("id") Long id){

        return ResponseEntity.ok("Get orderDetail with id "+id);
    }
    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getOrderDetail(@Valid @PathVariable("orderId") Long orderId ){

        List<OrderDetails> list = orderDetailService.findByOrderId(orderId);

        return  ResponseEntity.ok(list);
    }
    @PutMapping("/{orderId}")
    public ResponseEntity<?> updateOrderDetail(
            @Valid @PathVariable("orderId") Long orderId ,
            @Valid @RequestBody OderDetailDTO oderDetailDTO , BindingResult result){

            if(result.hasErrors()){
                List<String> errorMessage = result.getFieldErrors().stream()
                        .map(FieldError::getDefaultMessage).collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errorMessage);
            }

            return  ResponseEntity.ok("update orderdetail here ");



    }
@DeleteMapping("/{orderId}")
    public ResponseEntity<?> DeleteOrderDetail(@Valid @PathVariable("orderId") Long orderId){

        return  ResponseEntity.ok().body("delete success order detail ");

    }


}
