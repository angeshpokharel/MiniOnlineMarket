package com.waa.project.controller;

import com.waa.project.constants.SecurityConstants;
import com.waa.project.domain.Product;
import com.waa.project.dto.ProductDTO;
import com.waa.project.dto.ProductDetailDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.service.CartService;
import com.waa.project.service.GeneralService;
import com.waa.project.service.OrderService;
import com.waa.project.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.PublicKey;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private final ProductService productService;

    @Autowired
    private final GeneralService generalService;
    @Autowired
    private final OrderService orderService;

    public ProductController(ProductService productService, GeneralService generalService, OrderService orderService) {
        this.productService = productService;
        this.generalService = generalService;
        this.orderService = orderService;

    }

    @PostMapping

    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_SELLER + "')")
    public ResponseEntity<ProductDTO> saveProduct( @RequestBody @Valid ProductDTO productDTO) {

        productService.save(productDTO);
        return new ResponseEntity(productDTO, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_SELLER + "')")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable(value = "id") long id, @RequestBody @Valid ProductDTO productDTO) {
        productService.update(productDTO);
        return new ResponseEntity(productDTO, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO) {
        productService.update(productDTO);
        return  ResponseEntity.ok(productDTO);
    }

    @GetMapping
   // @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_ADMIN + "','" +SecurityConstants.ROLE_SELLER + "','" + SecurityConstants.ROLE_BUYER+ "')")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
//        return ResponseEntity.ok(productService.getAll());
        return new ResponseEntity(productService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<List<ProductDetailDTO>> getAllProductDetails() {
        var result = productService.getAllProductDetails();
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
//    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_ADMIN + "','" +  SecurityConstants.ROLE_SELLER + "','" + SecurityConstants.ROLE_BUYER+ "')")
     public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") long id) {
        ProductDTO productDTO = productService.getProductById(id);
        if (productDTO != null)
            return new ResponseEntity(productDTO, HttpStatus.OK);
        else
            return new ResponseEntity(new ProductDTO(), HttpStatus.NO_CONTENT);

    }

    @GetMapping(value = "detail/{id}")
    public ResponseEntity<ProductDetailDTO> getProductDetailById(@PathVariable("id") long id) {
       Optional<ProductDetailDTO>  productDetailDTO = productService.getProductDetailById(id);
        if (productDetailDTO.isPresent())
            return new ResponseEntity(productDetailDTO, HttpStatus.OK);
        else
            return new ResponseEntity(new ProductDTO(), HttpStatus.NO_CONTENT);
    }


    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_SELLER + "')")
    public ResponseEntity<?> Delete(@PathVariable long id) {


        //get cacrt details with prod Id
        Boolean prodInOrder = generalService.checkProductUsing(id);

        if (prodInOrder == false) {

            productService.delete(id);
            return new ResponseEntity(HttpStatus.OK);
        }
        else
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }


    }

