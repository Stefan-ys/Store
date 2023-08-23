package com.example.project.payload.request;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressWithNoValidationRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String country;
    private String state;
    private String town;
    private String postcode;
    private String street;
    private String number;
    private String floor;
    private String additionalInfo;
}
