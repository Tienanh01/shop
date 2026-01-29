package com.project.shopapp.Service;

import com.project.shopapp.Repository.OrderDetailRepository;
import com.project.shopapp.Repository.OrderRepository;
import com.project.shopapp.Repository.ProductRepository;
import com.project.shopapp.Repository.UserRepository;
import com.project.shopapp.dtos.OderDetailDTO;
import com.project.shopapp.dtos.OrderDTO;
import com.project.shopapp.models.Order;
import com.project.shopapp.models.OrderDetails;
import com.project.shopapp.models.Product;
import com.project.shopapp.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderDetailService implements IOrderDetailService{
    @Autowired
    private OrderDetailRepository orderDetailRepository;
@Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Override
    public OrderDetails createOrderDetail(OderDetailDTO orderdetail) {
        Product product = productRepository.findById(orderdetail.getProductId()).orElseThrow(
                ()->new RuntimeException("Not found product Id ")
        );

        Order order = orderRepository.findById(orderdetail.getOrderId()).
                orElseThrow( () -> new RuntimeException("Not found order id "))  ;

        OrderDetails newOrderDetail  = OrderDetails.builder()
                .price(orderdetail.getPrice())
                .numberOfProduct(Math.toIntExact((orderdetail.getNumberOfProducts())))
                .totalMoney(orderdetail.getTotalMoney())
                .color(orderdetail.getColor())
                .product(product)
                .order(order)
                .build();

         OrderDetails orderDetails =  orderDetailRepository.save(newOrderDetail);

         return  orderDetails;
    }

    @Override
    public OrderDetails getOrderDetailsById(Long id) {
        return null;
    }

    @Override
    public List<OrderDetails> getAllOrderDetails() {
        return null;
    }

    @Override
    public List<OrderDetails> findByOrderId(Long orderId) {
        List<OrderDetails> list = orderDetailRepository.findByOrderId(orderId);

        return  list;
    }

    @Override
    public OrderDetails updateOrderDetails(long orderDetailDto, OderDetailDTO category) {
        return null;
    }

    @Override
    public void deleteOrderDetails(Long id) {

    }
}
