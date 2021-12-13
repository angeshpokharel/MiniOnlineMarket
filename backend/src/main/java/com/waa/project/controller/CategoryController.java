package com.waa.project.controller;

import com.waa.project.domain.Category;
import com.waa.project.dto.CategoryDTO;
import com.waa.project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void createCategory(@RequestBody Category category) {
        categoryService.createCategory(category);
    }

    @GetMapping
    public List<CategoryDTO> listCategory(){
        return  categoryService.listCategory();
    }

    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void updateCategory(@PathVariable("id") long id, @RequestBody Category category){
        categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteCategory(@PathVariable("id") long id){
        categoryService.deleteCategory(id);
    }
}



