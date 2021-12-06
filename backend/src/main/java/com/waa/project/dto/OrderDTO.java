package com.waa.project.dto;

import com.waa.project.domain.OrderDetail;
import com.waa.project.domain.OrderHistory;
import com.waa.project.domain.OrderStatus;
import com.waa.project.domain.User;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private long id;
    private OrderStatus status;
    private String billingAddress;
    private String shippingAddress;
    private String paymentMode;
    private LocalDate paymentDate;
    private int points;
    private User user;
    private List<OrderHistory> orderSet = new ArrayList<>();
    private  List<OrderDetail> orderDetails;
}
