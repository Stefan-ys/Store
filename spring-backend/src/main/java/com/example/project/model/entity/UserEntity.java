package com.example.project.model.entity;

import com.example.project.model.embeddable.Address;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.*;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "users")
@Data
public class UserEntity extends BaseEntity {
    @Indexed(unique = true, background = true)
    @NotBlank
    @Size(min = 4, max = 24)
    private String username;
    @Indexed(unique = true, background = true)
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Size(min = 5, max = 30)
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Set<RoleEntity> roles = new HashSet<>();
    private LocalDateTime lastDateActive = LocalDateTime.now();
    private Address deliveryAddress = new Address();
    private Address paymentAddress = new Address();
    private Map<Boolean, List<ObjectId>> notifications = new HashMap<>();
    private int visits;

}

