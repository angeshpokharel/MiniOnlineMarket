package com.waa.project.service;

import com.waa.project.domain.Cart;
import com.waa.project.domain.Category;
import com.waa.project.dto.CartDTO;
import com.waa.project.dto.CartDetailDTO;
import com.waa.project.dto.CategoryDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<CategoryDTO> listCategory() {
        return categoryRepository.findAll()
                .stream()
                .map(c->modelMapper.map(c, CategoryDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public void createCategory(Category category) {
        categoryRepository.save(category);

    }

    @Override
    public void updateCategory(long id, Category category) {
        category.setId(id);
        categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepository.deleteById(id);
    }
}

