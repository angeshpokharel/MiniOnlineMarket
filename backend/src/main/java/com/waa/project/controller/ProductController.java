package com.waa.project.controller;

import com.waa.project.domain.Product;
import com.waa.project.dto.ProductDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductDTO> saveProduct(@RequestBody ProductDTO productDTO) {
        productService.save(productDTO);
        return ResponseEntity.ok(productDTO);
    }

    @PutMapping("/update")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO) {
        productService.update(productDTO);
        return  ResponseEntity.ok(productDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") long id){
        System.out.println(id);
        var a = productService.getProductById(id);
        System.out.println(a);
        return  ResponseEntity.ok(productService.getProductById(id));
    }

    @DeleteMapping(value = "/{id}")
    public void Delete(@PathVariable long id) {
        productService.delete(id);
    }
}
