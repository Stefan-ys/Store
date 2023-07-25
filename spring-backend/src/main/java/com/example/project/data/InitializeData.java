package com.example.project.data;

import com.example.project.model.entity.RoleEntity;
import com.example.project.model.entity.UserEntity;
import com.example.project.model.enums.RoleEnum;
import com.example.project.repository.RoleRepository;
import com.example.project.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@AllArgsConstructor
@Service
public class InitializeData {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initializationData() {
        if (roleRepository.count() == 0) {
            Arrays.stream(RoleEnum.values()).forEach((role) -> {
                        RoleEntity roleEntity = RoleEntity.builder()
                                .role(role)
                                .build();
                        roleRepository.save(roleEntity);
                    }
            );
            System.out.println("User roles initialized");
        }

        if (userRepository.count() == 0) {
            UserEntity adminUser = new UserEntity();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@mail.com");
            adminUser.setPassword(passwordEncoder.encode("adminadmin"));

            RoleEntity adminRole = new RoleEntity();
            adminRole.setRole(RoleEnum.ADMIN);
            adminUser.getRoles().add(adminRole);

            userRepository.save(adminUser);

            System.out.println("Data initialized: Admin user created");

            UserEntity userEntity = new UserEntity();
            userEntity.setUsername("user1111");
            userEntity.setEmail("user@mail.com");
            userEntity.setPassword(passwordEncoder.encode("user1111"));
            RoleEntity userRole = new RoleEntity();
            userRole.setRole(RoleEnum.USER);
            userEntity.getRoles().add(userRole);

            userRepository.save(userEntity);

            System.out.println("Data initialized: User created");

        } else {
            System.out.println("Data already present in the database");
        }
    }
}
