package com.waa.project.service;


import com.waa.project.dto.OrderDTO;
import com.waa.project.dto.OrderDetailDTO;
import com.waa.project.dto.OrderHistoryDTO;
import com.waa.project.dto.SellerViewOrderDetailDTO;

import java.util.List;

public interface OrderService {

    List<OrderDTO> findAll();
    OrderDTO findById(long id);
    void createOrder(long id, OrderDTO orderDTO);
    List<OrderDetailDTO> getOrderDetailsByOrderId(long id);
    List<OrderDTO> getOrderByUserId(long id);
    List<SellerViewOrderDetailDTO>getOrderBySellerId(long id);

    //Order History services
    List<OrderHistoryDTO> getAllOrderHistoryByOrderDetailId(long id);
    OrderHistoryDTO getOrderHistoryById(long id);
    void updateOrderStatus(long id, String newStatus);
    void updateOrderByOrderDetailId(long id);
}
