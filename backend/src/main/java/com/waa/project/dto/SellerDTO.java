package com.waa.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SellerDTO {
    private long id;
    private String email;
    private String name;
    private String address;
    private String phone;
    private String role;
}
