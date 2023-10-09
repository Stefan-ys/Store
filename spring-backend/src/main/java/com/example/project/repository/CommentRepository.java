package com.example.project.repository;

import com.example.project.model.entity.CommentEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<CommentEntity, ObjectId> {

    List<CommentEntity> findAllByProductIdOrderByCreatedDateAsc(ObjectId productId);

    List<CommentEntity> findAllByProductId(ObjectId productId);

    List<CommentEntity> findAllByUserId(ObjectId userId);

}
