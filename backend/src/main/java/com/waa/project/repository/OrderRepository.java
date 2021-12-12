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

}
