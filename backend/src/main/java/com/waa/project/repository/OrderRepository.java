package com.waa.project.repository;

import com.waa.project.domain.OrderDetail;
import org.springframework.data.jpa.repository.Query;

import com.waa.project.domain.Orders;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<Orders,Long> {
   List<Orders> findAll();
   List<Orders> findAllById(long id);
   Optional<Orders> findById(long id);

   @Query("SELECT o.orderDetails FROM Orders o WHERE o.id = :id")
   List<OrderDetail> findAllOrderDetailsByOrderId(@Param("id") long orderId);

   @Query("SELECT u.orders FROM User u WHERE u.id = :id")
   List<Orders> findAllOrderByUserId(@Param("id") long userId);

   @Query(value = "select t.id orderId, t.billingAddress, t.paymentMode, t.status status, u.name customerName, u.email email, t.quantity quantity, t.unit_price price, p.name productName  from \n" +
           "( \n" +
           "SELECT o.id id , o.Billing_address billingAddress, o.payment_date paymentDate, o.payment_mode paymentMode,  o.status, o.user_id, d.quantity, d.unit_price, d.product_id FROM ORDERS o\n" +
           "inner join Order_detail d on o.id = d.order_id\n" +
           ") t \n" +
           "inner join User u on u.id = t.user_id\n" +
           "inner join Product p on t.product_id = p.id\n" +
           " \n" +
           "where seller_id = ?1", nativeQuery = true)
   List<Orders> findAllOrderBySellerId(@Param("sellerId") long sellerId);

   @Query("SELECT od FROM OrderDetail od WHERE od.id = :orderDetailId")
   OrderDetail findOrderDetailByOrderDetailId(@Param("orderDetailId") long id);

}
