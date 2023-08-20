package com.example.project.model.entity;


import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ratings")
@Getter
@Setter
public class RatingEntity extends BaseEntity {
    private ObjectId productId;
    private String username;
    private int score;
}
