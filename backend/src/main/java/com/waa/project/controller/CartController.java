package com.waa.project.controller;

import com.waa.project.dto.CartDTO;
import com.waa.project.service.CartService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired
    CartService cartService;

    @GetMapping
    public List<CartDTO> findAll(){
        return cartService.findAll();
    }

    @GetMapping("/{userId}")
    public CartDTO findByUserId(@PathVariable("userId") long userId){
        return cartService.findByUserId(userId);
    }

    //comment by Win
    //Create from CRUD operations
    //this method should be called after uesr creation
    //As we don't have to pass Cart object at creation a new cart
    //we will pass only userId and it will create new empty shopping cart
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void createCartByUserId(@RequestParam("userId") long userId) throws Exception {
        System.out.println(cartService.findByUserId(userId));
        if(cartService.findByUserId(userId) != null)
            throw new Exception("The shopping card of this user is already exist");
        cartService.createCartByUserId(userId);
    }

    //comment by Win
    //Update from CRUD operations
    //accept cartId, productId and qty because we don't have to load all related data in passing data from frontend
    @PutMapping("/{cartId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void updateCartItem(@PathVariable("cartId") long cartId,
                                          @RequestParam("productId") long productId,
                                          @RequestParam("qty") int qty) throws Exception {
        cartService.updateCartItem(cartId, productId, qty);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteCartByCartId(@PathVariable("id") long id){
        cartService.deleteCart(id);
    }
}
