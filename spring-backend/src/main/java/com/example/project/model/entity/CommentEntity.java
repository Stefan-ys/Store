package com.example.project.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "comments")
@Getter
@Setter
@NoArgsConstructor
public class CommentEntity extends BaseEntity {
    private Integer rating;
    private ObjectId productId;
    private String username;
    private ObjectId userId;
    private String comment;
}
