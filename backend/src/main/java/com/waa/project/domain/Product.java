package com.waa.project.domain;

import java.math.BigDecimal;
import java.util.List;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private long id;
  private long categoryId;
  private long sellerId;
  private String name;
  private BigDecimal price;
  private String description;
  private String image;

  @JsonManagedReference
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  @Fetch(FetchMode.JOIN)
  List<OrderDetail> orderDetailList;
}
