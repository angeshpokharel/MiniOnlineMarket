package com.waa.project.service;

import com.waa.project.domain.Order;
import com.waa.project.domain.OrderDetail;
import com.waa.project.dto.OrderDTO;
import com.waa.project.dto.OrderDetailDTO;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    List<OrderDTO> findAll();
    OrderDTO findById(long id);
    void createOrder(OrderDTO orderDTO);
    List<OrderDetailDTO> getOrderDetailsByOrderId(long id);
    List<OrderDTO> getOrderByUserId(long id);
}
