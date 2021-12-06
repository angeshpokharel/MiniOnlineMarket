package com.waa.project.repository;

import com.waa.project.domain.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order,Long> {
   List<Order> findAll();
   List<Order> findAllById(long id);
   Order findById(long id);
}
