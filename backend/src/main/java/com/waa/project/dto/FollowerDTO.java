package com.waa.project.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FollowerDTO {

    private long id;

    private long followedTo;
    private long followedBy;
}
