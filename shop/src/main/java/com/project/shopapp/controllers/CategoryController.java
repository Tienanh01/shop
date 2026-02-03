package com.project.shopapp.controllers;

import com.project.shopapp.Service.CategoryService;
import com.project.shopapp.dtos.CategoryDTO;
import com.project.shopapp.models.Category;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/categories")
//@Validated

public class CategoryController {
    @Autowired
    private   CategoryService categoryService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoriesById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    //Hiện tất cả các categories
    @GetMapping("") //http://localhost:8088/api/v1/categories?page=1&limit=10
    public ResponseEntity<?> getAllCategories(
            @RequestParam(name = "page" , defaultValue = "1" )     int page,
            @RequestParam(value = "limit",defaultValue = "100")    int limit
    ) {
        return ResponseEntity.ok(categoryService.getAllCategories());
//        return ResponseEntity.ok(String.format("getAllCategories, page = %d, limit = %d", page, limit));
    }

    @PostMapping(
            value = "",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    //Nếu tham số truyền vào là 1 object thì sao ? => Data Transfer Object = Request Object
    public ResponseEntity<?> insertCategory(
            @RequestParam("name") String name,
            @RequestParam("group") Integer group,
            @RequestParam("file") MultipartFile file  ) throws IOException {

        return categoryService.createCategory(name, file,group);


    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id , CategoryDTO categoryDTO) {
       Category category =  categoryService.updateCategory(id,categoryDTO );

        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {

        categoryService.deleteCategory(id);
        return ResponseEntity.ok("deleteCategory with id = "+id);
    }
}
