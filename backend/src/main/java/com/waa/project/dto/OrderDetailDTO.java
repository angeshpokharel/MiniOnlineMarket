package com.waa.project.dto;

import com.waa.project.domain.Order;
import com.waa.project.domain.Product;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {

    private long id;
    private int quantity;
    private long unitPrice;
    private Product product;
    private Order order;
}
