package com.waa.project.repository;

import com.waa.project.domain.Follower;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowerRepository extends CrudRepository<Follower,Long> {
}
