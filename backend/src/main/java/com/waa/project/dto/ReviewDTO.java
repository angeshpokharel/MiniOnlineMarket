package com.waa.project.dto;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private long id;
    @NotNull
    private long productId;
    @NotEmpty
    private String message;
    private int rating;

    private Boolean isApproved;
}
