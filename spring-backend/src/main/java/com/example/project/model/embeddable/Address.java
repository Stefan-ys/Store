package com.example.project.model.embeddable;

import lombok.Data;

@Data
public class Address {
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
