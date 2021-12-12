package com.waa.project.dto;
import com.waa.project.domain.Product;
import lombok.*;

import java.math.BigDecimal;

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
    //private OrderDTO order;
}
