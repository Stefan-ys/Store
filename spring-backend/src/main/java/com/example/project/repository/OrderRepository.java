package com.example.project.repository;

import com.example.project.model.entity.OrderEntity;
import com.example.project.model.enums.OrderStatusEnum;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<OrderEntity, ObjectId> {

    List<OrderEntity> findAllByUserId(ObjectId userId);

    List<OrderEntity> findAllByOrderStatus(OrderStatusEnum orderStatusEnum);
}
