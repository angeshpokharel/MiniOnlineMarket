package com.waa.project.controller;

import com.waa.project.domain.Order;
import com.waa.project.domain.OrderStatus;
import com.waa.project.dto.OrderDTO;
import com.waa.project.dto.OrderDetailDTO;
import com.waa.project.dto.OrderHistoryDTO;
import com.waa.project.service.OrderService;
import com.waa.project.service.ProductService;
import com.waa.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;
//    private UserService userService;
//    private ProductService productService;

    @Autowired
    public OrderController(OrderService orderService/*, UserService userService, ProductService productService*/) {
        this.orderService = orderService;
        /*this.userService = userService;
        this.productService = productService;*/
    }

    @GetMapping
    public ResponseEntity<OrderDTO> findAll() {
        return new ResponseEntity(orderService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> findById(@PathVariable("id") long id) {
        return new ResponseEntity(orderService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public void createOrderByUserId(@PathVariable("id") long id, @RequestBody OrderDTO orderDTO) {
        orderService.createOrder(id, orderDTO);
    }

    @GetMapping("/{id}/orders")
    public ResponseEntity<OrderDTO> getAllOrdersbyUserId(@PathVariable("id") long id) {
        return new ResponseEntity(orderService.getOrderByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/orderDetails")
    public ResponseEntity<OrderDetailDTO> getAllOrderDetailsByOrderId(@PathVariable("id") long id) {
        return new ResponseEntity(orderService.getOrderDetailsByOrderId(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/orderHistory")
    public ResponseEntity<List<OrderHistoryDTO>> getAllOrderHistoryByOrderId(@PathVariable("id") long id){
        return new ResponseEntity(orderService.getAllOrderHistoryByOrderId(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/orderHistory/{historyId}")
    public ResponseEntity<OrderHistoryDTO> getOrderHistoryById(@PathVariable("historyId") long id){
        return new ResponseEntity(orderService.getOrderHistoryById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}/orderHistory/{historyId}")
    public void updateOrderByStatus(@PathVariable("historyId") long id, @RequestBody OrderStatus newStatus){
        orderService.updateOrderByStatus(id, newStatus);
    }


}