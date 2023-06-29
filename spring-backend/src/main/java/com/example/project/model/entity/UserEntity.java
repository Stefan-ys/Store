package com.example.project.model.entity;

import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.annotation.Documented;

@Document(collection = "users")
public class UserEntity {
    @Id
    private Long id;
    @Indexed(unique = true)
    @NonNull
    private String userName;
    @Indexed(unique = true)
    @NonNull
    private String Email;
    @NonNull
    private String password;

    public UserEntity() {
    }

    public Long getId() {
        return id;
    }

    public UserEntity setId(Long id) {
        this.id = id;
        return this;
    }

    @NonNull
    public String getUserName() {
        return userName;
    }

    public UserEntity setUserName(@NonNull String userName) {
        this.userName = userName;
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
}
