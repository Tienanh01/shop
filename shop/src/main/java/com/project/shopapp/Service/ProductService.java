package com.project.shopapp.Service;

import com.project.shopapp.Repository.CategoryRepository;
import com.project.shopapp.Repository.ProductImageRepository;
import com.project.shopapp.Repository.ProductRepository;
import com.project.shopapp.dtos.ProductDTO;
import com.project.shopapp.dtos.ProductImageDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.exceptions.InvalidParamException;
import com.project.shopapp.models.Category;
import com.project.shopapp.models.Product;
import com.project.shopapp.models.ProductImages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService{
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    @Override
    public Product createProduct(ProductDTO productDTO) {
        //CHECK is category exits
        Category existingCategory;
        try {
            existingCategory = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() ->
                            new DataNotFoundException("Could not find category with id " + productDTO.getCategoryId()));
        } catch (DataNotFoundException e) {
            throw new RuntimeException(e);
        }
        Product newProduct = Product.builder()
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .description(productDTO.getDescription())
                .thumbnail(productDTO.getThumbnail())
                .category(existingCategory).build();

        return productRepository.save(newProduct);

    }

    @Override
    public Product getProductById(Long id) {
        try {
            return productRepository.findById(id).orElseThrow(() ->
                    new DataNotFoundException("Can not find product with id = "+id));
        } catch (DataNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Page<Product> getAllProduct(PageRequest pageRequest) {

        return productRepository.findAll(pageRequest) ;
    }

    @Override
    public Product updateProduct(Long id, ProductDTO productDTO) {

        Product existingProduct = getProductById(id);
        if(existingProduct != null){

            Category existingCategory;
            try {
                existingCategory = categoryRepository.findById(productDTO.getCategoryId())
                        .orElseThrow(() ->
                                new DataNotFoundException("Could not find category with id " + productDTO.getCategoryId()));
            } catch (DataNotFoundException e) {
                throw new RuntimeException(e);
            }


            //sử dụng object mapper or modder mapper
            existingProduct.setName(productDTO.getName());
            existingProduct.setPrice(productDTO.getPrice());
            existingProduct.setDescription(productDTO.getDescription());
            existingProduct.setThumbnail(productDTO.getThumbnail());
            existingProduct.setCategory(existingCategory);
            return productRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    public void deleteProduct(long id) {
        Optional<Product> optionalProduct =  productRepository.findById(id);
//        if(optionalProduct.isPresent()){
//            productRepository.delete(optionalProduct.get());
//        }
         optionalProduct.ifPresent(productRepository::delete);

    }

    @Override
    public boolean existByName(String name) {
        return productRepository.existsByName(name);
    }

    @Override
    public ProductImages CreateProductImage(Long productId, ProductImageDTO productImageDTO) {
        Product existingProduct = getProductById(productId);


        ProductImages newProductImage = ProductImages.builder()
                .product(existingProduct)
                .imageURL(productImageDTO.getImageURL())
                .build();

        int size  = productImageRepository.findByProductId(productId).size();

        if(size <5 ){
            return   productImageRepository.save(newProductImage) ;
        }else {
            try {
                throw new InvalidParamException("Size of image must be smaller than 5");
            } catch (InvalidParamException e) {
                throw new RuntimeException(e);
            }

        }

    }


}
