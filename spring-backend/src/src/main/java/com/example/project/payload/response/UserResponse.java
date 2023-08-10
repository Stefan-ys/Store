package com.example.project.payload.response;

import lombok.Data;
import org.bson.types.ObjectId;

import java.util.List;

@Data
public class UserResponse {
    private ObjectId id;
    private String username;
    private String email;
    private List<String> roles;
    private String createdAt;
    private String lastActiveAt;
}
