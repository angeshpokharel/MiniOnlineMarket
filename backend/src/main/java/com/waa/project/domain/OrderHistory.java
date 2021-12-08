package com.waa.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderHistory {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private long modifiedBy;
    private LocalDate modifiedDate;

    @Column(name = "order_id")
    private long orderId;
    //@JsonBackReference

    /*@ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnoreProperties(allowGetters = false)
    private Order order;*/

}
