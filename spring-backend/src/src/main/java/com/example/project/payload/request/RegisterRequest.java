package com.example.project.payload.request;

import com.example.project.validation.PasswordMatching;
import com.example.project.validation.UniqueEmailAddress;
import com.example.project.validation.UniqueUsername;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@PasswordMatching(
        password = "password",
        confirmPassword = "confirmPassword",
        message = "Password and Confirm Password must be matched!")
public class RegisterRequest {
    @UniqueUsername
    @NotEmpty(message = "Username is required")
    @Size(min = 4, max = 24, message = "Username must be between 4 and 24 characters long")
    private String username;
    @UniqueEmailAddress
    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    @NotEmpty(message = "Password is required")
    @Size(min = 5, max = 30, message = "Password must be at least 5 characters long")
    private String password;
    @NotEmpty(message = "Confirm Password is required")
    private String confirmPassword;

}
