package com.project.shopapp.Service;

import com.project.shopapp.dtos.CategoryDTO;
import com.project.shopapp.models.Category;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICategoryService {

    Category createCategory (String name , MultipartFile file) throws IOException;
    Category getCategoryById(Long id);
    List<Category> getAllCategories();
    Category updateCategory(long categoryId , CategoryDTO category);
    void deleteCategory(long id) ;


}
