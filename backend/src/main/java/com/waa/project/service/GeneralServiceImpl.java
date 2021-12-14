package com.waa.project.service;

import com.waa.project.domain.CartDetail;
import com.waa.project.domain.OrderDetail;
import com.waa.project.domain.Orders;
import com.waa.project.repository.CartDetailRepository;
import com.waa.project.repository.CartRepository;
import com.waa.project.repository.OrderDetailRepository;
import com.waa.project.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneralServiceImpl implements GeneralService{
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CartDetailRepository cartDetailRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Override
    public Boolean checkProductUsing(long id) {
        Boolean result = false;
        //checking in shopping cart
        List<CartDetail> cartItems= (List<CartDetail>) cartDetailRepository.findAll();

        for(CartDetail cd : cartItems){
            if(cd.getProduct().getId() == id) {
                result = true;
                break;
            }
        }

        //next checking in order
        if(!result) {
            List<OrderDetail> orderItems = (List<OrderDetail>) orderDetailRepository.findAll();
            Boolean isUsedByOrder = false;
            for(OrderDetail od : orderItems){
                if(od.getProduct().getId() == id){
                    result = true;
                    break;
                }
            }
        }
        return result;
    }

    @Override
    public long getPointsByUserId(long userId) {
        long points = 0;
        List<Orders> orders = orderRepository.findAll();
        for(Orders o : orders){
            if(o.getUser().getId() == userId)
                points += o.getPoints();
        }
        return points;
    }
}
