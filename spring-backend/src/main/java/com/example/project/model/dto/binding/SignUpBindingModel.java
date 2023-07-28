package com.example.project.model.dto.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignUpBindingModel {
    @NotEmpty(message = "Username is required")
    @Size(min = 4, max = 24, message = "Username must be between 6 and 20 characters long")
    private String username;
    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    @NotEmpty(message = "Password is required")
    @Size(min = 5, max = 30, message = "Password must be at least 6 characters long")
    private String password;
    @NotEmpty(message = "Confirm Password is required")
    private String confirmPassword;

}
