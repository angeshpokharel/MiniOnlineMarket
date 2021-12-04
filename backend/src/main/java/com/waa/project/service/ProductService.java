package com.waa.project.service;

import com.waa.project.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    void save(ProductDTO productDTO);
    List<ProductDTO> getAll();
}
