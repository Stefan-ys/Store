package com.example.project.payload.response;

import lombok.Data;

@Data
public class UserResponse {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String roles;
    private String createdDate;
    private String lastActiveDate;
    private int visits;
}
