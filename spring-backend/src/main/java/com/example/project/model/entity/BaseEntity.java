package com.example.project.model.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
public abstract class BaseEntity {
    @Id
    private @MongoId ObjectId id;
}
