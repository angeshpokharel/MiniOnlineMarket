package com.waa.project.repository;

import com.waa.project.domain.Follower;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowerRepository extends CrudRepository<Follower,Long> {
    List<Follower> findByFollowedBy(long followedBy);

    Follower findByFollowedByAndAndFollowedTo(long followedBy, long followedTo);
}
