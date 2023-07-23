package com.example.project.model.dto.view;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
public class UserViewModel {
    private ObjectId id;
    private String username;
    private String email;
    private String role;
}
