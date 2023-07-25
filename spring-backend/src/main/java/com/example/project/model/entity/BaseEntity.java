package com.example.project.model.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;

@Data
public abstract class BaseEntity {
    @Id
    private @MongoId ObjectId id;
    @CreatedDate
    private LocalDate createdDate = LocalDate.now();
    @LastModifiedDate
    private LocalDate lastModifiedDate = LocalDate.now();
}
