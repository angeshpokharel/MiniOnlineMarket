package com.waa.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//public interface SellerViewOrderDetailDTO {
//      long setOrderId();
//      String setBillingAddress();
//      String setCustomerName();
//      String setMail();
//      long setPrice();
//      String setDate();
//      int setQuantity();
//      long setAmount();
//      long sellerId();
//      String setPaymentMode();
//      String setStatus();
//      String setEmail();
//      String setProductName();
//
//
//}

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerViewOrderDetailDTO {
      long OrderId;
      String BillingAddress;
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
