package com.example.project.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class DeliveryAddressRequest {
    @NotEmpty(message = "First name is required")
    private String firstName;
    @NotEmpty(message = "Last name is required")
    private String lastName;
    @NotEmpty(message = "Phone number is required")
    private String phoneNumber;
    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    private String orderEmail;
    @NotEmpty(message = "Country is required")
    private String country;
    private String state;
    @NotEmpty(message = "Town is required")
    private String town;
    @NotEmpty(message = "Post code is required")
    private String postCode;
    @NotEmpty(message = "Street name is required")
    private String street;
    @NotEmpty(message = "Address number is required")
    private String number;
    private String floor;
    private String additionalInfo;
}
