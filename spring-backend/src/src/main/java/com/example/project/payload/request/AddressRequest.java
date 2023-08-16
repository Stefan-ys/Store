package com.example.project.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressRequest {
    @NotEmpty(message = "First name is required")
    private String firstName;
    @NotEmpty(message = "Last name is required")
    private String lastName;
    @NotEmpty(message = "Phone number is required")
    private String phoneNumber;
    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    @NotEmpty(message = "Country is required")
    private String country;
    @NotEmpty(message = "State is required")
    private String state;
    @NotEmpty(message = "Town is required")
    private String town;
    @NotEmpty(message = "Post code is required")
    private String postcode;
    @NotEmpty(message = "Street name is required")
    private String street;
    @NotEmpty(message = "Address number is required")
    private String number;
    private String floor;
    private String additionalInfo;
}
