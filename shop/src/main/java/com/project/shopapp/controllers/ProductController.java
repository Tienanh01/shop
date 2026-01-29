package com.project.shopapp.controllers;

import com.project.shopapp.Service.ProductService;
import com.project.shopapp.dtos.ProductDTO;
import com.project.shopapp.dtos.ProductImageDTO;
import com.project.shopapp.models.Product;
import com.project.shopapp.models.ProductImages;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService ;

    @PostMapping(value = "")
    //POST http://localhost:8088/v1/api/products
    public ResponseEntity<?> createProduct(
            @Valid @RequestBody ProductDTO productDTO,
            BindingResult result
    ) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Product newProduct = productService.createProduct(productDTO);
return ResponseEntity.ok(newProduct);

        } catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    }
@PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
        @PathVariable("id") Long id,
        @Valid @RequestBody ProductDTO productDTO,
            BindingResult result
    ) {
        try {
//            if (result.hasErrors()) {
//                List<String> errorMessages = result.getFieldErrors()
//                        .stream()
//                        .map(FieldError::getDefaultMessage)
//                        .toList();
//                return ResponseEntity.badRequest().body(errorMessages);
//            }
            Product updatedProduct = productService.updateProduct(id,productDTO);


            return ResponseEntity.ok(updatedProduct);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping(value = "uploads/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    public ResponseEntity<?> uploadImages (
            @ModelAttribute("file") List<MultipartFile> files
    ){

//        Product existingProduct = productService.
////            List<MultipartFile> files = productDTO.getFiles();
//            files = files == null ? new ArrayList<MultipartFile>() : files;
//            for (MultipartFile file : files) {
//                if (file.getSize() == 0) {
//                    continue;
//                }
//                // Kiểm tra kích thước file và định dạng
//                if (file.getSize() > 10 * 1024 * 1024) { // Kích thước > 10MB
//                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
//                            .body("File is too large! Maximum size is 10MB");
//                }
//                String contentType = file.getContentType();
//                System.out.println("contentType " + contentType);
//                if (contentType == null || !contentType.startsWith("image/")) {
//                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
//                            .body("File must be an image");
//                }
//                // Lưu file và cập nhật thumbnail trong DTO
//                String filename = storeFile(file); // Thay thế hàm này với code của bạn để lưu file
//                //lưu vào đối tượng product trong DB => sẽ làm sau
//                ProductImages productImages =  productService.CreateProductImage(
//                        newProduct.getId() ,
//                        ProductImageDTO.builder().imageURL(filename).build()
//                );
//                //lưu vào bảng product_images
//            }
            return ResponseEntity.ok("Product created successfully");

    }
    private String storeFile(MultipartFile file) throws IOException {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        // Thêm UUID vào trước tên file để đảm bảo tên file là duy nhất
        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;
        // Đường dẫn đến thư mục mà bạn muốn lưu file
        java.nio.file.Path uploadDir = Paths.get("uploads");
        // Kiểm tra và tạo thư mục nếu nó không tồn tại
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        // Đường dẫn đầy đủ đến file
        java.nio.file.Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
        // Sao chép file vào thư mục đích
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }

    @GetMapping("")
    public ResponseEntity<?> getProducts(
            @RequestParam(value = "page" , defaultValue = "1") int page,
            @RequestParam(value = "limit",defaultValue = "10") int limit
    ) {
//        PageRequest pageRequest =  ;
        Page<Product> list =  productService.getAllProduct(PageRequest.of(page-1,limit));
        return ResponseEntity.ok(list);
    }

    //http://localhost:8088/api/v1/products/6
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(
            @PathVariable("id") Long productId
    ) {
      Product product =   productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }
    @Operation(summary = "Delete a product ", description = "Delete a product  status done ")
    @DeleteMapping("/{id}")

    public ResponseEntity<?> deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().body("Success ");
    }
}
