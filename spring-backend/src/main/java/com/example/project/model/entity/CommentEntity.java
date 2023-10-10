package com.example.project.model.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;


@EqualsAndHashCode(callSuper = true)
@Document(collection = "comments")
@Data
public class CommentEntity extends BaseEntity {
    private Integer rating;
    private ObjectId productId;
    private String username;
    private ObjectId userId;
    private String comment;
}
