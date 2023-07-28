package com.example.project.model.embeddable;

import lombok.Data;

@Data
public class DeliveryInformation {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String orderEmail;
    private Address address;
}
