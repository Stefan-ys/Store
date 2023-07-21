package com.example.project.model.entity;

import com.example.project.model.enums.RoleEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
@EqualsAndHashCode(callSuper = true)
@Document(collection = "roles")
@Data
public class RoleEntity extends BaseEntity {
    private RoleEnum role;


}
