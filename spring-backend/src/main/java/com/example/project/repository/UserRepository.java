package com.example.project.repository;

import com.example.project.model.entity.ProductEntity;
import com.example.project.model.entity.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, ObjectId> {
    Page<UserEntity> findAll(Pageable pageable);

    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsernameIgnoreCase(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmailIgnoreCase(String email);
}
