package com.example.project.model.dto.view;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserViewModel {
    private String id;
    private String username;
    private String email;
    private String role;
}
