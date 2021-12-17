package com.waa.project.repository;

import com.waa.project.domain.Cart;
import com.waa.project.domain.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.websocket.server.PathParam;
import java.util.List;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    public List<Category> findAll();
    //public  Category save(Category persisted);
    //public void delete(long id);
}
