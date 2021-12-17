package com.waa.project.controller;

import com.waa.project.constants.SecurityConstants;
import com.waa.project.domain.Cart;
import com.waa.project.dto.CartDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.service.CartService;
import com.waa.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_BUYER + "')")
    public void createCartByUserId(@RequestParam("userId") long userId) throws Exception {

        if(cartService.findByUserId(userId) != null)
            throw new Exception("The shopping card of this user is already exist");
        cartService.createCartByUserId(userId);
    }

    //comment by Win
    //Update from CRUD operations
    //accept cartId, productId and qty because we don't have to load all related data in passing data from frontend
    @PutMapping("/{cartId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PreAuthorize("hasAnyRole('" + SecurityConstants.ROLE_BUYER + "')")
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
