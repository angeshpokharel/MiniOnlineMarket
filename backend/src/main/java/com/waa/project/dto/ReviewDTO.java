package com.waa.project.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private long id;

    private long productId;
    private String message;
    private int rating;

    private  Boolean isApproved;
}
