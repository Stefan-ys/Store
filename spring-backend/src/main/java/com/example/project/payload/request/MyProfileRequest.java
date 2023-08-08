package com.example.project.payload.request;

import lombok.Data;

@Data
public class MyProfileRequest {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
