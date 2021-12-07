package com.waa.project.service;

import com.waa.project.domain.Product;
import com.waa.project.dto.ProductDTO;
import com.waa.project.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public void save(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        productRepository.save(product);
    }

    @Override
    public List<ProductDTO> getAll() {
        List<Product> products = (List<Product>) productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(long id) {

        return modelMapper.map(productRepository.findById(id).get(),ProductDTO.class);
    }


    private Product convertToEntity(ProductDTO productDTO) {
        return modelMapper.map(productDTO, Product.class);
    }

    private ProductDTO convertToDTO(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }
}

