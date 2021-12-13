package com.waa.project.service;

import com.waa.project.dto.ProductDTO;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    void save(ProductDTO productDTO);

    List<ProductDTO> getAll();

    ProductDTO getProductById(long id);

    void delete(long id);

    void update(ProductDTO productDTO);


}
