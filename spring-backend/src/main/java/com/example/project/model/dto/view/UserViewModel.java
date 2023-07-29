package com.example.project.model.dto.view;

import lombok.Data;
import org.bson.types.ObjectId;

import java.util.List;

@Data
public class UserViewModel {
    private ObjectId id;
    private String username;
    private String email;
    private List<String> roles;
    private String createdAt;
    private String lastActiveAt;
}
