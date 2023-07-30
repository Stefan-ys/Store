package com.example.project.repository;

import com.example.project.model.entity.ProductEntity;
import com.example.project.model.enums.CategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends MongoRepository<ProductEntity, ObjectId> {

    List<ProductEntity> findAllByProductCategory(CategoryEnum category);

    List<ProductEntity> findAllByStatus(ProductStatusEnum status);
}
