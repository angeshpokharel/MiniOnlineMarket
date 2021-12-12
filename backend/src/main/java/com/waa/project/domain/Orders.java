package com.waa.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity

@Table(name = "ORDERS")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.NEW;

    private String billingAddress;

    private String shippingAddress;

    private String paymentMode;

    private LocalDate paymentDate;

    private long points;

    //@JsonBackReference

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

   // @JsonManagedReference
    //@OneToMany(cascade = CascadeType.ALL, mappedBy = "order", fetch = FetchType.LAZY)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
   // @JoinColumn(name = "order_id", referencedColumnName = "id")
    private List<OrderHistory> orderHistories = new ArrayList<>();

    //@JsonManagedReference
    //@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    //@JoinColumn(name = "order_id", referencedColumnName = "id")
    private  List<OrderDetail> orderDetails;




}
