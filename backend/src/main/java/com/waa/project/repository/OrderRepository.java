package com.waa.project.repository;

import com.waa.project.domain.Order;
import com.waa.project.domain.OrderDetail;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<Order,Long> {
   List<Order> findAll();
   List<Order> findAllById(long id);
   Optional<Order> findById(long id);

   @Query("SELECT o.orderDetails FROM Order o WHERE o.id = :id")
   List<OrderDetail> findAllOrderDetailsByOrderId(@Param("id") long orderId);

   @Query("SELECT u.orders FROM User u WHERE u.id = :id")
   List<Order> findAllOrderByUserId(@Param("id") long userId);
}
