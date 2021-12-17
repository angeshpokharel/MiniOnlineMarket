package com.waa.project.dto;

import com.sun.istack.NotNull;
import com.waa.project.domain.OrderDetail;
import com.waa.project.domain.OrderHistory;
import com.waa.project.domain.OrderStatus;
import com.waa.project.domain.User;
import lombok.*;

import javax.validation.constraints.NotEmpty;
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
    private String status;
    @NotEmpty
    private String billingAddress;
    @NotEmpty
    private String shippingAddress;
    @NotEmpty
    private String paymentMode;
    @NotNull
    private LocalDate paymentDate;

    private int points;
    private UserDTO user;
    private List<OrderHistoryDTO> orderHistories = new ArrayList<>();
    private List<OrderDetailDTO> orderDetails;
}
