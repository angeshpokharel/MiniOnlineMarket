package com.waa.project.controller;

import com.waa.project.domain.Cart;
import com.waa.project.dto.CartDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.service.CartService;
import com.waa.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired
    CartService cartService;

    @GetMapping
    public List<CartDTO> findAll(){
        return cartService.findAll();
    }

    @GetMapping("/{id}")
    public CartDTO findById(@PathVariable("id") long id){
        return cartService.findById(id);
    }

    //comment by Win
    //Create from CRUD operations
    //this method should be called after uesr creation
    //As we don't have to pass Cart object at creation a new cart
    //we will pass only userId and it will create new empty shopping cart
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void createCartByUserId(@RequestParam("userId") long userId) throws Exception {
        if(cartService.findByUserId(userId) != null)
            throw new Exception("The shopping card of this user is already exist");
        cartService.createCartByUserId(userId);
    }

    //comment by Win
    //Update from CRUD operations
    //accept cartId, productId and qty because we don't have to load all related data in passing data from frontend
    @PutMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void updateCartByAddingProduct(@RequestParam("cartId") long userId,
                                          @RequestParam("productId") long productId,
                                          @RequestParam("qty") int qty){
        cartService.updateCartByAddingProduct(userId, productId, qty);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteCartByCartId(@PathVariable("id") long id){
        cartService.deleteCart(id);
    }
}
