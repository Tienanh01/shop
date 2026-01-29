package com.project.shopapp.controllers;
import com.project.shopapp.Service.OrderService;
import com.project.shopapp.dtos.CategoryDTO;
import com.project.shopapp.dtos.OrderDTO;
import com.project.shopapp.models.Order;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/orders")
public class OderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrders(@RequestBody @Valid OrderDTO orderDTO , BindingResult result){
        if(result.hasErrors()){
            List<String > errorMessage = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).collect(Collectors.toList());
            return  ResponseEntity.ok(errorMessage);
        }

        try {
            return ResponseEntity.ok(orderService.createOrder(orderDTO)) ;
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    lấy danh sách order từ user_id
    @GetMapping("/{user_id}")
    public ResponseEntity<?> getOrders(@Valid @PathVariable("user_id") Long userId){
        try {
            List<Order> orders = orderService.findByUserId(userId);

            return ResponseEntity.ok(orders);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PutMapping ("/{id}")
    public ResponseEntity<?> updateOrders (
            @Valid @PathVariable long id,
            @RequestBody @Valid OrderDTO orderDTO , BindingResult result){
        if(result.hasErrors()){
            List<String > errorMessage = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).collect(Collectors.toList());
            return  ResponseEntity.ok(errorMessage);
        }

        try {
            Order order = orderService.updateOrders(id,orderDTO);
            return  ResponseEntity.ok().body(order);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping ("/{id}")
    public ResponseEntity<?> deleteOrders(
            @Valid @PathVariable long id){
        try {
            orderService.deleteOrders(id);
           return  ResponseEntity.ok().body("Delete success");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    public ResponseEntity<?>
}
