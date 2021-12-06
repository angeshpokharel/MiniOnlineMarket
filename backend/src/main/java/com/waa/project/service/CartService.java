package com.waa.project.service;

import com.waa.project.domain.Cart;
import com.waa.project.dto.CartDTO;

import java.util.List;

public interface CartService {
    public List<CartDTO> findAll();
    public CartDTO findById(long id);
    public CartDTO findByUserId(long id);
    public void createCartByUserId(long userId);
    public void updateCartItem(long userId, long productId, int qty) throws Exception;
    public void deleteCart(long id);
}
