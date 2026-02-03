package com.project.shopapp.Service;

import com.project.shopapp.Repository.CategoryRepository;
import com.project.shopapp.dtos.CategoryDTO;
import com.project.shopapp.models.Category;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
@Service
public class CategoryService implements ICategoryService{
    @Autowired
    private  CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<?> createCategory(String name , MultipartFile file , Integer group) throws IOException {

        // check exit category
                if (categoryRepository.existsByName(name)) {
                    return ResponseEntity.internalServerError().body("Category already exists");
                }
                // 2) lưu file
                String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path uploadDir = Paths.get("uploads/categories");
        Files.createDirectories(uploadDir);

        Path filePath = uploadDir.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 3) tạo category
        Category category = Category.builder()
                .name(name)
                .group(group)
                .imageUrl("/uploads/categories/" + filename)
                .build();

        return ResponseEntity.ok().body(categoryRepository.save(category));
    }


    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() ->new RuntimeException("category not found"));
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateCategory(long categoryId, CategoryDTO categoryDTO) {
        Category existingCategory = getCategoryById(categoryId);
        existingCategory.setName(categoryDTO.getName());

        existingCategory.setName( categoryDTO.getName());

        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(long id) {
//        Category existingCategory = getCategoryById(id);
         categoryRepository.deleteById(id);
    }
}
