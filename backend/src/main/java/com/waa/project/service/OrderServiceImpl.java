package com.waa.project.service;

import com.waa.project.domain.Order;
import com.waa.project.dto.OrderDTO;
import com.waa.project.repository.OrderRepository;
import com.waa.project.service.OrderService;
import com.waa.project.util.ListMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    private ModelMapper modelMapper;
    private ListMapper<Order, OrderDTO> listMapper;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, ModelMapper modelMapper, ListMapper<Order, OrderDTO> listMapper){
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.listMapper = listMapper;
    }

    @Override
    public List<OrderDTO> findAll(){
        return (List<OrderDTO>) listMapper.mapList(orderRepository.findAll(), new OrderDTO());
    }

    @Override
    public OrderDTO findById(long id) {
        Optional<Order> order = orderRepository.findById(id);
        order.orElseThrow(() -> new NullPointerException("Order Not found"));
        return modelMapper.map(order.get(), OrderDTO.class);
    }

    @Override
    public void createOrder(OrderDTO orderDTO) {
        orderRepository.save(modelMapper.map(orderDTO, Order.class));
    }

    @Override
    public List<OrderDTO> findAllById(long userId) {
        return (List<OrderDTO>) listMapper.mapList(orderRepository.findAllById(userId), new OrderDTO());
    }
}
