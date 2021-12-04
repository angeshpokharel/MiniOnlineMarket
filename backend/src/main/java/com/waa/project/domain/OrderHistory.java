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
public class OrderHistory {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private long OrderId;
    private String status;
    private long modifiedBy;
    private Date modifiedDate;
}
