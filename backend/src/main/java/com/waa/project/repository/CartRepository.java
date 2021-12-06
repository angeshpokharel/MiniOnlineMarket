package com.waa.project.repository;

import com.waa.project.domain.Cart;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.websocket.server.PathParam;
import java.util.List;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
    public List<Cart> findAll();

    @Query("SELECT c FROM Cart c WHERE c.user.id=:userId")
    public Cart findByUserId(@PathParam("userId") long userId);
}
