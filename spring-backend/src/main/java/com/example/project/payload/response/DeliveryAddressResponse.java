package com.example.project.payload.response;

import lombok.Data;

@Data
public class DeliveryAddressResponse {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String orderEmail;
    private String country;
    private String state;
    private String town;
    private String postCode;
    private String street;
    private String number;
    private String floor;
    private String additionalInfo;
}
