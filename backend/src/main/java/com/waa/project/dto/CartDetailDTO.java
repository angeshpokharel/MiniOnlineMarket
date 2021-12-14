package com.waa.project.dto;

import com.waa.project.domain.Cart;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CartDetailDTO {

    private long id;
    private ProductDTO product;
    private int quantity;

}
