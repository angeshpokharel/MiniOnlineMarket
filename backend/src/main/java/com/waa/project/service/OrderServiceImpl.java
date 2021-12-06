package com.waa.project.service;

import com.waa.project.domain.Order;
import com.waa.project.domain.OrderDetail;
import com.waa.project.dto.OrderDTO;
import com.waa.project.dto.OrderDetailDTO;
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
    private ListMapper<OrderDetail, OrderDetailDTO> listMapperOrderList;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            ModelMapper modelMapper,
                            ListMapper<Order, OrderDTO> listMapper,
                            ListMapper<OrderDetail, OrderDetailDTO> listMapperOrderList){
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.listMapper = listMapper;
        this.listMapperOrderList = listMapperOrderList;
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
        Order order = modelMapper.map(orderDTO, Order.class);
        orderRepository.save(order);

    }

    @Override
    public List<OrderDetailDTO> getOrderDetailsByOrderId(long id) {
        return (List<OrderDetailDTO>) listMapperOrderList.mapList(orderRepository.findAllOrderDetailsByOrderId(id), new OrderDetailDTO());
    }

    @Override
    public List<OrderDTO> getOrderByUserId(long id) {
        return (List<OrderDTO>) listMapper.mapList(orderRepository.findAllOrderByUserId(id), new OrderDTO());
    }
}
