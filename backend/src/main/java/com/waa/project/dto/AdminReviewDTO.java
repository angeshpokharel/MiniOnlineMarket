package com.waa.project.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AdminReviewDTO {
    private long id;
    private long productId;
    private String productName;
    private String message;
}
