package com.project.shopapp.Service;

import com.project.shopapp.Repository.OrderRepository;
import com.project.shopapp.Repository.UserRepository;
import com.project.shopapp.dtos.OrderDTO;
import com.project.shopapp.models.Order;
import com.project.shopapp.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class OrderService implements IOrderService{
@Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Override
    public Order createOrder(OrderDTO orderDTO) {

        User exitsUser = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found "));

        Order newOrder = Order.builder()
                .email(orderDTO.getEmail())
                .address(orderDTO.getAddress())
                .note(orderDTO.getNote())
                .user(exitsUser)
                .fullName(orderDTO.getFullName())
                .phoneNumber(orderDTO.getPhoneNumber())
                .totalMoney(orderDTO.getTotalMoney())
                .shippingMethod(orderDTO.getShippingMethod())
                .paymentMethod(orderDTO.getPaymentMethod()).
                build();

        newOrder.setActive(true);


        Order order = orderRepository.save(newOrder);
        return  order;
    }

    @Override
    public List<Order> findByUserId(Long id) {

        User exits = userRepository.findById(id).orElseThrow(() ->
            new RuntimeException("User not found ")
        );
        List<Order> orders = orderRepository.findByUserId(exits.getId());

        return orders;
    }

    @Override
    public void deleteOrders(Long id) {

           orderRepository.deleteById(id);




    }


    @Override
    public Order updateOrders( Long id, OrderDTO orderDTO) {



       Order order =  orderRepository.findById(id).orElseThrow(() -> new RuntimeException("id not found"));
            Order exitsOrder = Order.builder().
                    id(order.getId())
                    .email(orderDTO.getEmail())
                    .address(orderDTO.getAddress())
                    .note(orderDTO.getNote())
                    .user(order.getUser())
                    .fullName(orderDTO.getFullName())
                    .phoneNumber(orderDTO.getPhoneNumber())
                    .totalMoney(orderDTO.getTotalMoney())
                    .shippingMethod(orderDTO.getShippingMethod())
                    .paymentMethod(orderDTO.getPaymentMethod()).
                    build();
        orderRepository.save(exitsOrder);
        return order;
    }



}
