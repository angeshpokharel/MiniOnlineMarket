package com.waa.project.service;

import com.waa.project.dto.ProductDTO;
import com.waa.project.dto.ProductDetailDTO;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    void save(ProductDTO productDTO);

    List<ProductDTO> getAll();

    ProductDTO getProductById(long id);

    Optional<ProductDetailDTO> getProductDetailById(long id);

    void delete(long id);

    void update(ProductDTO productDTO);
    List<ProductDetailDTO> getAllProductDetails();

}
