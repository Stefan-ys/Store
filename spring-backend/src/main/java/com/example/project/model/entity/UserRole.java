package com.example.project.model.entity;

import com.example.project.model.enums.RoleEnum;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.security.core.GrantedAuthority;

@Document(collection = "roles")
public class UserRole implements GrantedAuthority {

    @Id
    private @MongoId ObjectId id;
    private RoleEnum role;

    @Override
    public String getAuthority() {
        return role.name();
    }

    public UserRole() {
    }

    public RoleEnum getRole() {
        return role;
    }

    public UserRole setRole(RoleEnum role) {
        this.role = role;
        return this;
    }
}
