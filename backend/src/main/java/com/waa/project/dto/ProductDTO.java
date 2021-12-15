package com.waa.project.dto;

import java.math.BigDecimal;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
  private long id;
  private long categoryId;
  private long sellerId;
  private String name;
  private long price;
  private String description;
  private String image;
}
