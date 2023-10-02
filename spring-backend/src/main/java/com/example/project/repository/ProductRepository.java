package com.example.project.repository;

import com.example.project.model.entity.ProductEntity;
import com.example.project.model.enums.ProductCategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends MongoRepository<ProductEntity, ObjectId> {
    Page<ProductEntity> findAll(Pageable pageable);

    Page<ProductEntity> findAllByProductCategory(ProductCategoryEnum category, Pageable paging);

    Page<ProductEntity> findAllByStatus(ProductStatusEnum statusEnum, Pageable pageable);

    @Query("{ 'status' : ?0 }")
    List<ProductEntity> findRandomByStatus(ProductStatusEnum statusEnum , Pageable pageable);

    ;
}
