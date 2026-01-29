package com.project.shopapp.Service;

import com.project.shopapp.dtos.CategoryDTO;
import com.project.shopapp.dtos.OrderDTO;
import com.project.shopapp.models.Category;
import com.project.shopapp.models.Order;


import java.util.List;

public interface IOrderService {
    Order createOrder (OrderDTO orderDTO);
    List<Order> findByUserId(Long id);

    void deleteOrders(Long  id) ;

    Order updateOrders( Long id, OrderDTO orderDTO);
}
