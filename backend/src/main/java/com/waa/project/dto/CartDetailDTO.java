package com.waa.project.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CartDetailDTO {

    private long id;

    private long cartId;
    private long productId;
    private int quantity;

}
