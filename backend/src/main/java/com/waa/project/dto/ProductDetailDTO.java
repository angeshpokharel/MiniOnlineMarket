package com.waa.project.dto;

import lombok.*;


public interface ProductDetailDTO {
    long getId();

    String getCategoryName();

    long getCategoryId();

    long getSellerId();

    String getSellerName();

    String getName();

    long getPrice();

    String getDescription();

    String getImage();
}
