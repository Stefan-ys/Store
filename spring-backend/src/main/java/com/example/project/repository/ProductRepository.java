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



@Repository
public interface ProductRepository extends MongoRepository<ProductEntity, ObjectId> {
    Page<ProductEntity> findAll(Pageable pageable);

    Page<ProductEntity> findAllByProductCategory(ProductCategoryEnum category, Pageable paging);

    Page<ProductEntity> findAllByStatus(ProductStatusEnum statusEnum, Pageable pageable);

    Page<ProductEntity> findByProductCategoryIn(String[] categories, Pageable pageable);

    Page<ProductEntity> findByStatusIn(String[] status, Pageable pageable);

    Page<ProductEntity> findByProductCategoryInAndStatusIn(String[] categories, String[] status, Pageable pageable);

    Page<ProductEntity> searchByNameIgnoreCaseContaining(String keyword, Pageable pageable);

}
