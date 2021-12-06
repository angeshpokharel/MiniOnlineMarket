package com.waa.project.repository;

import com.waa.project.domain.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<Order,Long> {
   List<Order> findAll();
   List<Order> findAllById(long id);
   Optional<Order> findById(long id);
}
