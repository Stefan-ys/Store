package com.example.project.repository;

import com.example.project.model.entity.RoleEntity;
import com.example.project.model.enums.RoleEnum;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<RoleEntity, ObjectId> {
    RoleEntity findByRole(RoleEnum roleEnum);
}
