package com.waa.project.service;

import com.waa.project.domain.*;
import com.waa.project.dto.OrderDTO;
import com.waa.project.dto.OrderDetailDTO;
import com.waa.project.dto.ProductDTO;
import com.waa.project.repository.OrderRepository;
import com.waa.project.repository.UserRepository;
import com.waa.project.service.OrderService;
import com.waa.project.util.ListMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    private ModelMapper modelMapper;
    private ListMapper<Order, OrderDTO> listMapper;
    private ListMapper<OrderDetail, OrderDetailDTO> listMapperOrderList;
    private UserRepository userRepository;
    private ProductService productService;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            ModelMapper modelMapper,
                            ListMapper<Order, OrderDTO> listMapper,
                            ListMapper<OrderDetail, OrderDetailDTO> listMapperOrderList,
                            UserRepository userRepository,
                            ProductService productService){
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.listMapper = listMapper;
        this.listMapperOrderList = listMapperOrderList;
        this.userRepository = userRepository;
        this.productService = productService;
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
    public void createOrder(long id, OrderDTO orderDTO) {
        Optional<User> user = userRepository.findById(id);
        Order order = new Order();
        order.setUser(user.get());
        order.setOrderDetails(new ArrayList<OrderDetail>());

        for (OrderDetailDTO orderDetailDTO: orderDTO.getOrderDetails()) {
            OrderDetail orderDetail = new OrderDetail();
            Product product = modelMapper.map(productService.getProductById(orderDetailDTO.getProduct().getId()), Product.class);
            orderDetail.setQuantity(orderDetailDTO.getQuantity());
            orderDetail.setUnitPrice(orderDetailDTO.getUnitPrice());
            orderDetail.setProduct(product);
            orderDetail.setOrder(modelMapper.map(orderDTO, Order.class));
            order.getOrderDetails().add(orderDetail);
        }

        order.setBillingAddress(orderDTO.getBillingAddress());
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setPaymentMode(orderDTO.getPaymentMode());
        order.setPaymentDate(LocalDate.now());
        order.setPoints(orderDTO.getOrderDetails().stream()
                .map(o -> o.getUnitPrice() * o.getQuantity())
                .reduce((a, b) -> a + b).get());

        order.setOrderHistories(new ArrayList<OrderHistory>());
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setStatus(OrderStatus.NEW);
        orderHistory.setModifiedDate(LocalDate.now());
        orderHistory.setModifiedBy(user.get().getId());
        orderHistory.setOrder(order);
        order.getOrderHistories().add(orderHistory);
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
