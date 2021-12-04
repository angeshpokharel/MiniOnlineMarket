package com.waa.project.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CartDetail {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private long cartId;
    private long productId;
    private int quantity;
}
