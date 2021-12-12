package com.waa.project.service;


import com.waa.project.domain.OrderDetail;
import com.waa.project.domain.OrderStatus;
import com.waa.project.dto.OrderDTO;
import com.waa.project.dto.OrderDetailDTO;
import com.waa.project.dto.OrderHistoryDTO;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    List<OrderDTO> findAll();
    OrderDTO findById(long id);
    void createOrder(long id, OrderDTO orderDTO);
    List<OrderDetailDTO> getOrderDetailsByOrderId(long id);
    List<OrderDTO> getOrderByUserId(long id);

    //Order History services
    List<OrderHistoryDTO> getAllOrderHistoryByOrderId(long id);
    OrderHistoryDTO getOrderHistoryById(long id);
    void updateOrderByStatus(long id, OrderStatus newStatus);
}
