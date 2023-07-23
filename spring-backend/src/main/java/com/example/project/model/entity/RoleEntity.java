package com.example.project.model.entity;

import com.example.project.model.enums.RoleEnum;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
@EqualsAndHashCode(callSuper = true)
@Document(collection = "roles")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleEntity extends BaseEntity {
    private RoleEnum role;


}
