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
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private long id;
  private long categoryId;
  private long sellerId;
  private String name;
  private long price;
  private String description;
  private String image;

}
