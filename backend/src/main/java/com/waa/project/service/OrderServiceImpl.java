package com.waa.project.service;

import com.waa.project.domain.*;
import com.waa.project.dto.*;
import com.waa.project.repository.OrderDetailRepository;
import com.waa.project.repository.OrderHistoryRepository;
import com.waa.project.repository.OrderRepository;
import com.waa.project.repository.UserRepository;
import com.waa.project.service.OrderService;
import com.waa.project.util.ListMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Order;
import javax.transaction.Transactional;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private EmailService emailService;


    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            ModelMapper modelMapper,
                            ListMapper<Orders, OrderDTO> listMapper,
                            ListMapper<OrderDetail, OrderDetailDTO> listMapperOrderList,
                            UserRepository userRepository,
                            ProductService productService,
                            ListMapper<OrderHistory, OrderHistoryDTO> listMapperOrderHistory,
                            OrderDetailRepository orderDetailRepository,
                            OrderHistoryRepository orderHistoryRepository,
                            EmailService emailService) {
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.listMapper = listMapper;
        this.listMapperOrderList = listMapperOrderList;
        this.userRepository = userRepository;
        this.productService = productService;
        this.listMapperOrderHistory = listMapperOrderHistory;
        this.orderHistoryRepository = orderHistoryRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.emailService = emailService;
    }

    @Override
    public List<OrderDTO> findAll() {
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

        for (OrderDetailDTO orderDetailDTO : orderDTO.getOrderDetails()) {
            OrderDetail orderDetail = new OrderDetail();
            Product product = modelMapper.map(productService.getProductById(orderDetailDTO.getProduct().getId()), Product.class);
            orderDetail.setQuantity(orderDetailDTO.getQuantity());
            orderDetail.setUnitPrice(product.getPrice());
            orderDetail.setProduct(product);
            orderDetail.setOrderId(order.getId());
            orderDetail.setStatus(OrderStatus.NEW.getOrderStatus());
            //orderDetail.setOrderId(1);
            //orderDetail.setOrder(modelMapper.map(orderDTO, Order.class));
            order.getOrderDetails().add(orderDetail);
        }

        order.setBillingAddress(orderDTO.getBillingAddress());
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setPaymentMode(orderDTO.getPaymentMode());
        order.setPaymentDate(LocalDate.now());
        order.setPoints(orderDTO.getOrderDetails().stream()
                .map(o -> o.getProduct().getPrice() * o.getProduct().getPrice())
                .reduce((a, b) -> a + b).get());


        for (OrderDetail od: order.getOrderDetails()) {
            List<OrderHistory> orderHistList = new ArrayList<>();
            OrderHistory orderHistory = new OrderHistory();
            orderHistory.setStatus(OrderStatus.NEW.getOrderStatus());
            orderHistory.setModifiedDate(LocalDate.now());
            orderHistory.setModifiedBy(user.get().getId());
            orderHistList.add(orderHistory);

            od.setOrderHistories(orderHistList);
        }

        //sendEmail(order);
        orderRepository.save(order);

      // order.getOrderDetails().forEach(x -> x.setOrderId(savedOrder.getId()));

    }

    public void sendEmail(Orders order) {
        String email = order.getUser().getEmail();
        String subject = "Order confirmation email from MiniMarket";
        String text = String.format("Your orders with id #%d has been confirmed from MiniMart and you will be notified after shipping", order.getId());
        emailService.sendSimpleMessage(email, subject, text);
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
    public List<SellerViewOrderDetailDTO> getOrderBySellerId(long sellerId) {
        List<Orders> list = orderRepository.findAll();

        List<SellerViewOrderDetailDTO> res = new ArrayList<>();
        for (Orders o : list) {
            for (OrderDetail d : o.getOrderDetails().stream().filter(x -> x.getProduct().getSellerId() == sellerId).collect(Collectors.toList())) {

                SellerViewOrderDetailDTO mod = new SellerViewOrderDetailDTO();
                mod.setOrderId(o.getId());
                mod.setBillingAddress(o.getBillingAddress());
                mod.setCustomerName(o.getUser().getName());
                mod.setEmail(o.getUser().getEmail());
                mod.setPrice(d.getUnitPrice());
                mod.setDate(o.getPaymentMode());
                mod.setQuantity(d.getQuantity());
                mod.setAmount(d.getQuantity() * d.getUnitPrice());
                mod.setPaymentMode(o.getPaymentMode());
                mod.setStatus(d.getStatus());
                mod.setProductName(d.getProduct().getName());
                mod.setShippingAddress(o.getShippingAddress());
                mod.setOrderDetailId(d.getId());
                res.add(mod);
            }
        }
        return res;

    }

    @Override
    public List<OrderHistoryDTO> getAllOrderHistoryByOrderDetailId(long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id).get();
        List<OrderHistory> orderHistories = orderDetail.getOrderHistories();
        return (List<OrderHistoryDTO>) listMapperOrderHistory.mapList(orderHistories, new OrderHistoryDTO());
    }

    @Override
    public OrderHistoryDTO getOrderHistoryById(long id) {
        return modelMapper.map(orderHistoryRepository.findById(id).get(), OrderHistoryDTO.class);
    }

    @Override
    public void updateOrderStatus(long id, String newStatus) {
        OrderDetail orderDetail = orderRepository.findOrderDetailByOrderDetailId(id);
        String updatedStatus = newStatus.substring(1, newStatus.length() - 1);
        orderDetail.setStatus(updatedStatus);

        //GetUserId from username obtained from SecurityContext and save here
        //orderHistory.setModifiedBy(userId);
        //orderHistory.getOrder().setStatus(newStatus);

        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setStatus(updatedStatus);
        /*UserDetails user = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = user.getUsername();
        Replace with user from curretly user id*/
        orderHistory.setModifiedBy(1);
        orderHistory.setModifiedDate(LocalDate.now());
        orderDetail.getOrderHistories().add(orderHistory);
        orderDetailRepository.save(orderDetail);
    }


}
