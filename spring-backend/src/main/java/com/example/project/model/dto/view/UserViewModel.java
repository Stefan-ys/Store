package com.example.project.model.dto.view;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserViewModel {
    private ObjectId id;
    private String username;
    private String email;
    private String role;
}
