package com.waa.project.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {

    private long id;
    private long orderId;
    private long productId;
    private int quantity;
    private long unitPrice;
}
