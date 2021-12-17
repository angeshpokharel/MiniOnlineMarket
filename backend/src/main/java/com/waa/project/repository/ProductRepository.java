package com.waa.project.repository;

import com.waa.project.domain.Product;
import com.waa.project.dto.ProductDTO;

import com.waa.project.dto.ProductDetailDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product,Long> {

    @Query(value = "select  p.id, g.category_name as categoryName,p.category_Id as categoryId,u.id as sellerId,u.name as sellerName,  p.name, p.price, p.description ,p.image  from Product  p join Category  g  on  p.category_Id = g.id inner join User  u on p.seller_Id = u.id",nativeQuery = true)
    List<ProductDetailDTO> findAllProductDetails();
}
