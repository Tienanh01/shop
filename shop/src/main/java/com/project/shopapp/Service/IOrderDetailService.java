package com.project.shopapp.Service;

import com.project.shopapp.dtos.CategoryDTO;
import com.project.shopapp.dtos.OderDetailDTO;
import com.project.shopapp.models.Category;
import com.project.shopapp.models.OrderDetails;

import java.util.List;

public interface IOrderDetailService {
    OrderDetails createOrderDetail (OderDetailDTO orderdetail );
    OrderDetails getOrderDetailsById(Long id);
    List<OrderDetails> getAllOrderDetails();

    List<OrderDetails> findByOrderId(Long orderId);
    OrderDetails updateOrderDetails(long orderDetailDto , OderDetailDTO category);
    void deleteOrderDetails(Long id) ;
}
