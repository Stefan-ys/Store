package com.example.project.model.entity;

import com.example.project.model.enums.RoleEnum;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleEntity{
    private RoleEnum role;
}
