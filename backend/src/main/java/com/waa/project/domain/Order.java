package com.waa.project.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private long userId;
    private String status;
    private String billingAddress;
    private String shippingAddress;
    private String paymentMode;
    private Date paymentDate;
    private int points;
}
