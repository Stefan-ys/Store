package com.example.project.payload.response;

import lombok.Data;

@Data
public class ProfileResponse {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
 
}
