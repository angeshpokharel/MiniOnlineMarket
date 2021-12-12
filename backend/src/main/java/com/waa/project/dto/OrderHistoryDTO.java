package com.waa.project.dto;

import com.waa.project.domain.OrderStatus;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistoryDTO {
    private long id;
    private String status;
    private long modifiedBy;
    private LocalDate modifiedDate;
    //private OrderDTO order;
}
