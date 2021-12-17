package com.waa.project.controller;

import com.waa.project.constants.SecurityConstants;
import com.waa.project.domain.Product;
import com.waa.project.dto.ProductDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_SELLER+ "')")
    public ResponseEntity<ProductDTO> saveProduct(@RequestBody ProductDTO productDTO) {
        productService.save(productDTO);
        return ResponseEntity.ok(productDTO);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_SELLER+ "')")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO) {
        productService.update(productDTO);
        return  ResponseEntity.ok(productDTO);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_ADMIN + "','" + SecurityConstants.ROLE_BUYER+ "')")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_ADMIN + "','" + SecurityConstants.ROLE_BUYER+ "')")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") long id){
       
        return  ResponseEntity.ok(productService.getProductById(id));
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_SELLER+ "')")
    public void Delete(@PathVariable long id) {
        productService.delete(id);
    }
}
