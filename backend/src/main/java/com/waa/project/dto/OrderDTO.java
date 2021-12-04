package com.waa.project.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private long id;

    private long userId;
    private String status;
    private String billingAddress;
    private String shippingAddress;
    private String paymentMode;
    private Date paymentDate;
    private int points;
}
