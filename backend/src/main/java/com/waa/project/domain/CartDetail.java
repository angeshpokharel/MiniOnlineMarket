package com.waa.project.domain;

import lombok.*;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name= "cart_id")
    private Cart cart;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    private int quantity;
}
