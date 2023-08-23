package com.example.project.repository;

import com.example.project.model.entity.ShoppingCartEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends MongoRepository<ShoppingCartEntity, ObjectId> {

    Optional<ShoppingCartEntity> findByUserId(ObjectId userId);
}
