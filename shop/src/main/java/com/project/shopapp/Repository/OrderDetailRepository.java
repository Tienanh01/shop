package com.project.shopapp.Repository;

import com.project.shopapp.models.Category;
import com.project.shopapp.models.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetails,Long> {
    List<OrderDetails> findByOrderId(Long orderId);

    List<OrderDetails> findByProductId(Long productId);

}
