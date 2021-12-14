package com.waa.project.service;

import com.waa.project.domain.Cart;
import com.waa.project.domain.CartDetail;
import com.waa.project.domain.Product;
import com.waa.project.dto.CartDTO;
import com.waa.project.dto.CartDetailDTO;
import com.waa.project.dto.UserDTO;
import com.waa.project.repository.CartDetailRepository;
import com.waa.project.repository.CartRepository;
import com.waa.project.repository.ProductRepository;
import com.waa.project.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService{
    @Autowired
    CartRepository cartRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartDetailRepository cartDetailRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<CartDTO> findAll() {
        return cartRepository.findAll()
                .stream()
                .map(c->modelMapper.map(c, CartDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CartDTO findById(long id) {
        Optional<Cart> result = cartRepository.findById(id);
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(result.get().getId());
        cartDTO.setUser(modelMapper.map(result.get().getUser(), UserDTO.class));
        cartDTO.setCartDetails(result.get().getCartDetails().stream()
                .map(c->modelMapper.map(c, CartDetailDTO.class))
                .collect(Collectors.toList()));
        return cartDTO;
    }

    @Override
    public CartDTO findByUserId(long userId) {
        Cart result = cartRepository.findByUserId(userId);
        if(result == null)
            return null;
        else{
            CartDTO cartDTO = new CartDTO();
            cartDTO.setId(result.getId());
            cartDTO.setUser(modelMapper.map(result.getUser(), UserDTO.class));
            cartDTO.setCartDetails(result.getCartDetails().stream()
                    .map(c -> modelMapper.map(c, CartDetailDTO.class))
                    .collect(Collectors.toList()));
            return cartDTO;
        }
    }

    @Override
    public void createCartByUserId(long userId) {
        Cart newCart = new Cart();
        newCart.setUser(userRepository.findById(userId).get());
        cartRepository.save(newCart);
    }

    @Override
    public void updateCartItem(long cartId, long productId, int qty) throws Exception {
        //getting existingCart back from db
        Cart existingCart = cartRepository.findById(cartId).get();

        //if coming product is already exist in the shopping cart, it will add qty to existing cart detail row
        Optional<CartDetail> existingCartDetail = existingCart.getCartDetails()
                .stream()
                .filter(cd->cd.getProduct().getId()==productId)
                .findFirst();
        if(existingCartDetail.isPresent()) {
            int updatedQty =existingCartDetail.get().getQuantity() + qty;
            System.out.println(updatedQty);
            existingCartDetail.get().setQuantity(updatedQty);
            if(existingCartDetail.get().getQuantity() <= 0) {
                existingCart.getCartDetails().remove(existingCartDetail.get());
                cartDetailRepository.deleteById(existingCartDetail.get().getId());
                System.out.println("cart detail row is deleted as qty is equal or less than 0");
            }
            else {
                cartDetailRepository.save(existingCartDetail.get());
            }
        }
        else {
            if(qty <= 0)
                throw new Exception("Qty must be greater than 0");
            //getting product data from db
            Product product = productRepository.findById(productId).get();

            //creating new cart detail row
            CartDetail newCartDetail = new CartDetail();
            newCartDetail.setProduct(product);
            newCartDetail.setQuantity(qty);
            newCartDetail.setCart(existingCart);
            cartDetailRepository.save(newCartDetail);

            //adding new cart detail row to new cart
            existingCart.getCartDetails().add(newCartDetail);
        }

        cartRepository.save(existingCart);
    }

    @Override
    public void deleteCart(long id) {
        cartRepository.deleteById(id);
    }
}
