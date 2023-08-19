package com.example.project.model.entity;

import com.example.project.model.embeddable.ShoppingCart;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "users")
@Data
@NoArgsConstructor
public class UserEntity extends BaseEntity {
    @Indexed(unique = true)
    @NotBlank
    @Size(min = 4, max = 24)
    private String username;
    @Indexed(unique = true)
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Size(min = 5, max = 30)
    private String password;
    private Set<RoleEntity> roles = new HashSet<>();
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private LocalDate lastActiveDate = LocalDate.now();
    @DBRef
    private DeliveryInformation deliveryInformation;
    @DBRef
    private ShoppingCart shoppingCart;

}

