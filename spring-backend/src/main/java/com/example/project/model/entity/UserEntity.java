package com.example.project.model.entity;

import com.example.project.model.embeddable.DeliveryInformation;
import com.example.project.model.embeddable.ShoppingCart;
import com.mongodb.lang.NonNull;

import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "users")
@Data
public class UserEntity extends BaseEntity {
    @Indexed(unique = true)
    @NonNull
    private String username;
    @Indexed(unique = true)
    @NonNull
    private String email;
    @NonNull
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Set<RoleEntity> roles = new HashSet<>();
    private LocalDate lastActiveDate = LocalDate.now();
    private DeliveryInformation deliveryInformation;
    private ShoppingCart shoppingCart;

}

