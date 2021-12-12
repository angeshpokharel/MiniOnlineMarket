package com.waa.project.service;

import com.waa.project.domain.*;
import com.waa.project.dto.OrderDTO;
import com.waa.project.dto.OrderDetailDTO;
import com.waa.project.dto.OrderHistoryDTO;
import com.waa.project.dto.ProductDTO;
import com.waa.project.repository.OrderDetailRepository;
import com.waa.project.repository.OrderHistoryRepository;
import com.waa.project.repository.OrderRepository;
import com.waa.project.repository.UserRepository;
import com.waa.project.service.OrderService;
import com.waa.project.util.ListMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private ListMapper<Orders, OrderDTO> listMapper;
    private ListMapper<OrderDetail, OrderDetailDTO> listMapperOrderList;
    private ListMapper<OrderHistory, OrderHistoryDTO> listMapperOrderHistory;
    private UserRepository userRepository;
    private ProductService productService;
    private OrderDetailRepository orderDetailRepository;
    private OrderHistoryRepository orderHistoryRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            ModelMapper modelMapper,
                            ListMapper<Orders, OrderDTO> listMapper,
                            ListMapper<OrderDetail, OrderDetailDTO> listMapperOrderList,
                            UserRepository userRepository,
                            ProductService productService,
                            ListMapper<OrderHistory, OrderHistoryDTO> listMapperOrderHistory,
                            OrderDetailRepository orderDetailRepository,
                            OrderHistoryRepository orderHistoryRepository){
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.listMapper = listMapper;
        this.listMapperOrderList = listMapperOrderList;
        this.userRepository = userRepository;
        this.productService = productService;
        this.listMapperOrderHistory = listMapperOrderHistory;
        this.orderHistoryRepository = orderHistoryRepository;
        this.orderDetailRepository = orderDetailRepository;
    }

    @Override
    public List<OrderDTO> findAll(){
        return (List<OrderDTO>) listMapper.mapList(orderRepository.findAll(), new OrderDTO());
    }

    @Override
    public OrderDTO findById(long id) {
        Optional<Orders> order = orderRepository.findById(id);
        order.orElseThrow(() -> new NullPointerException("Order Not found"));
        return modelMapper.map(order.get(), OrderDTO.class);
    }

    @Override
    public void createOrder(long id, OrderDTO orderDTO) {
        Optional<User> user = userRepository.findById(id);
        Orders order = new Orders();
        order.setUser(user.get());
        order.setOrderDetails(new ArrayList<OrderDetail>());

        for (OrderDetailDTO orderDetailDTO: orderDTO.getOrderDetails()) {
            OrderDetail orderDetail = new OrderDetail();
            Product product = modelMapper.map(productService.getProductById(orderDetailDTO.getProduct().getId()), Product.class);
            orderDetail.setQuantity(orderDetailDTO.getQuantity());
            orderDetail.setUnitPrice(product.getPrice());
            orderDetail.setProduct(product);

            //orderDetail.setOrder(modelMapper.map(orderDTO, Order.class));
            order.getOrderDetails().add(orderDetail);
        }

        order.setBillingAddress(orderDTO.getBillingAddress());
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setPaymentMode(orderDTO.getPaymentMode());
        order.setPaymentDate(LocalDate.now());
        order.setPoints(orderDTO.getOrderDetails().stream()
                .map(o -> o.getQuantity() * o.getProduct().getPrice())
                .reduce((a, b) -> a + b).get());

        order.setOrderHistories(new ArrayList<OrderHistory>());
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setStatus(order.getStatus());
        orderHistory.setModifiedDate(LocalDate.now());
        orderHistory.setModifiedBy(user.get().getId());
       // orderHistory.setOrder(order);
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

    @Override
    public List<OrderHistoryDTO> getAllOrderHistoryByOrderId(long id) {
        return (List<OrderHistoryDTO>) listMapperOrderHistory.mapList(orderHistoryRepository.findAllByOrderId(id), new OrderHistoryDTO());
    }

    @Override
    public OrderHistoryDTO getOrderHistoryById(long id) {
        return modelMapper.map(orderHistoryRepository.findById(id).get(), OrderHistoryDTO.class);
    }

    @Override
    public void updateOrderStatus(long id, String newStatus) {
        Orders order = orderRepository.findById(id).get();
        String updatedStatus = newStatus.substring(1, newStatus.length()-1);
        order.setStatus(updatedStatus);
        //GetUserId from username obtained from SecurityContext and save here
        //orderHistory.setModifiedBy(userId);
        //orderHistory.getOrder().setStatus(newStatus);

        List<OrderHistory> orderHistories = order.getOrderHistories();
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setStatus(updatedStatus);
        /*UserDetails user = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = user.getUsername();
        Replace with user from curretly user id*/
        orderHistory.setModifiedBy(1);
        orderHistory.setModifiedDate(LocalDate.now());
        orderHistories.add(orderHistory);
        orderRepository.save(order);
    }


}
