package com.waa.project.repository;

import com.waa.project.domain.Orders;
import com.waa.project.domain.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends CrudRepository<Review,Long> {
    List<Review> findAll();
    Optional<Review> findById(long id);
}
