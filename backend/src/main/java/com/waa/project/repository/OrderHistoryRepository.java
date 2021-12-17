package com.waa.project.repository;

import com.waa.project.domain.OrderHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderHistoryRepository extends CrudRepository<OrderHistory, Long> {
    //@Query("SELECT o.orderHistories FROM Orders o WHERE o.id = :id")
    //List<OrderHistory> findAllByOrderId(@Param("id") long orderId);
}
