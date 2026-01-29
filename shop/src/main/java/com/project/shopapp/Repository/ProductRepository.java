package com.project.shopapp.Repository;


import com.project.shopapp.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCategoryId(Long productId);
    boolean existsByName(String name);

    Page<Product> findAll(Pageable pageable);
}
