package com.waa.project.service;

import com.waa.project.domain.Order;
import com.waa.project.dto.OrderDTO;

import java.util.List;

public interface OrderService {
    List<OrderDTO> findAllById(long userId);
    List<OrderDTO> findAll();
    OrderDTO findById(long id);
    void createOrder(OrderDTO orderDTO);
}
