package com.example.project.model.entity;

import com.mongodb.lang.NonNull;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Set;

@Document(collection = "users")
@Data
public class UserEntity {
    @Id
    private @MongoId ObjectId id;
    @Indexed(unique = true)
    @NonNull
    private String username;
    @Indexed(unique = true)
    @NonNull
    private String Email;
    @NonNull
    private String password;
    private Set<UserRole> roles;

}
