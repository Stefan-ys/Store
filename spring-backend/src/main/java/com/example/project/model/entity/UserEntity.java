package com.example.project.model.entity;

import com.example.project.model.enums.RoleEnum;
import com.mongodb.lang.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Set;

@Document(collection = "users")
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
    private Set<RoleEnum> authorities;

    public UserEntity() {
    }

    public ObjectId getId() {
        return id;
    }

    public UserEntity setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @NonNull
    public String getUsername() {
        return username;
    }

    public UserEntity setUsername(@NonNull String username) {
        this.username = username;
        return this;
    }

    @NonNull
    public String getEmail() {
        return Email;
    }

    public UserEntity setEmail(@NonNull String email) {
        Email = email;
        return this;
    }

    @NonNull
    public String getPassword() {
        return password;
    }

    public UserEntity setPassword(@NonNull String password) {
        this.password = password;
        return this;
    }

    public Set<RoleEnum> getAuthorities() {
        return authorities;
    }

    public UserEntity setAuthorities(Set<RoleEnum> authorities) {
        this.authorities = authorities;
        return this;
    }
}
