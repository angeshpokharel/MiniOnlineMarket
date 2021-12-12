package com.waa.project.repository;

import com.waa.project.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String userEmail);
    User findById(long id);
}
