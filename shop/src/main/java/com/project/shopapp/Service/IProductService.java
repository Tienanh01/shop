package com.project.shopapp.Service;

import com.project.shopapp.dtos.ProductDTO;
import com.project.shopapp.dtos.ProductImageDTO;
import com.project.shopapp.models.Product;
import com.project.shopapp.models.ProductImages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface IProductService {
    public Product createProduct(ProductDTO productDTO);

    Product getProductById(Long id);

    Page<Product> getAllProduct(PageRequest pageRequest);

    Product updateProduct(Long id , ProductDTO productDTO);

    void deleteProduct(long id);

    boolean existByName(String name) ;

    //
    ProductImages CreateProductImage(Long productId , ProductImageDTO productImageDTO);
}
