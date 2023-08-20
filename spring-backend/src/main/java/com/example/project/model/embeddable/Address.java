package com.example.project.model.embeddable;

import lombok.Data;

@Data
public class Address {
    private String country;
    private String state;
    private String town;
    private String postCode;
    private String street;
    private String number;
    private String floor;
    private String additionalInfo;
}
