package com.waa.project.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistoryDTO {
    private long id;

    private long OrderId;
    private String status;
    private long modifiedBy;
    private Date modifiedDate;
}
