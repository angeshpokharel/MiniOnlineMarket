package com.waa.project.service;

import com.waa.project.domain.Category;
import com.waa.project.dto.CartDTO;
import com.waa.project.dto.CategoryDTO;
import com.waa.project.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

public interface CategoryService {

     public void createCategory(Category category);
     public List<CategoryDTO> listCategory();
     public void updateCategory(long id, Category category);
     public void deleteCategory(long id);

}
