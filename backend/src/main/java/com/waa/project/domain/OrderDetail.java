package com.waa.project.domain;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderDetail {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    private int quantity;
    private long unitPrice;
    @Column(name = "order_id")
    private long orderId;


    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    private String status = OrderStatus.NEW.getOrderStatus();
   // @JsonBackReference

    /*@ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnoreProperties(allowGetters = false)
    private Order order;*/
}
