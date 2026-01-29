package com.project.shopapp.Repository;

import com.project.shopapp.models.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProductImageRepository extends JpaRepository<ProductImages ,Long> {

    List<ProductImages> findByProductId(Long productId);
}
