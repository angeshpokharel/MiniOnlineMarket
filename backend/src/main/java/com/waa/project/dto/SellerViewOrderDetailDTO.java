package com.waa.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerViewOrderDetailDTO {
    long OrderId;
    long orderDetailId;
    String BillingAddress;
    String ShippingAddress;
    String CustomerName;
    long Price;
    String Date;
    int Quantity;
    long Amount;
    String PaymentMode;
    String Status;
    String Email;
    String ProductName;
}
