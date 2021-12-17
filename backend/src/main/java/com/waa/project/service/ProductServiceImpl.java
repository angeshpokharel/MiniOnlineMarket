package com.waa.project.service;

import com.waa.project.constants.SecurityConstants;
import com.waa.project.domain.Product;
import com.waa.project.dto.ProductDTO;
import com.waa.project.dto.ProductDetailDTO;
import com.waa.project.repository.CartDetailRepository;
import com.waa.project.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public void save(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
       var prod =  productRepository.save(product);
    }

    @Override
    public List<ProductDTO> getAll() {
        List<Product> products = (List<Product>) productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.isPresent() ? modelMapper.map(product.get(), ProductDTO.class) : null;
    }

    @Override
    public Optional<ProductDetailDTO>  getProductDetailById(long id) {
        return productRepository.findAllProductDetails().stream().filter( x -> x.getId() == id).findFirst();
    }

    @Override
    public void delete(long id) {

        productRepository.deleteById(id);
    }

    @Override
    public void update(ProductDTO productDTO) {
        Optional<Product> prdOpt = productRepository.findById(productDTO.getId());
        if (prdOpt.isPresent()) {
            Product prd = prdOpt.get();
            if (productDTO.getCategoryId() != 0) prd.setCategoryId(productDTO.getCategoryId());
            if (productDTO.getDescription() != null) prd.setDescription(productDTO.getDescription());
            prd.setPrice(productDTO.getPrice());
            prd.setName(productDTO.getName());
            prd.setImage(productDTO.getImage());
            productRepository.save(prd);
        }
    }

    @Override
    public List<ProductDetailDTO> getAllProductDetails() {
        var result = productRepository.findAllProductDetails();
        return result.stream().collect(Collectors.toList());
    }


    private Product convertToEntity(ProductDTO productDTO) {
        return modelMapper.map(productDTO, Product.class);
    }

    private ProductDTO convertToDTO(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }
}

