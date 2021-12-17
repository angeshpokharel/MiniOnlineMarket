package com.waa.project.dto;

import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
  private String categoryName;

  @NotNull
  private long categoryId;
  private long sellerId;
  private  String sellerName;
  @NotEmpty
  private String name;
  @NotNull
  @Min(0)
  private long price;
  @NotEmpty
  private String description;
  private String image;
}
