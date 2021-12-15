package com.waa.project.dto;

import com.waa.project.domain.CartDetail;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private long id;
    private UserDTO user;
    private List<CartDetailDTO> cartDetails;
}
