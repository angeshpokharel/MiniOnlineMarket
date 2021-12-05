package com.waa.project.service;

import com.waa.project.domain.Order;

import java.util.List;

public interface OrderService {
    List<Order> findAllById(long userId);

}
