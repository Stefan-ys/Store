package com.example.project.data;

import com.example.project.model.entity.ProductEntity;
import com.example.project.model.entity.RoleEntity;
import com.example.project.model.entity.UserEntity;
import com.example.project.model.enums.CategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import com.example.project.model.enums.RoleEnum;
import com.example.project.repository.ProductRepository;
import com.example.project.repository.RoleRepository;
import com.example.project.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;

@AllArgsConstructor
@Service
public class InitializeData {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initializationData() {
        if (roleRepository.count() == 0) {
            addRoles();
        }
        if (userRepository.count() == 0) {
            addUser("admin", "admin@email.com", "adminadmin", RoleEnum.ADMIN);
            addUser("user1", "user1@email.com", "user1user1", RoleEnum.USER);
            addUser("user2", "user2@email.com", "user2user2", RoleEnum.USER);
        }
        if (productRepository.count() == 0) {
            addProduct("item1", BigDecimal.valueOf(2.99), 10, "Random Item1", CategoryEnum.ITEM_TYPE_1, ProductStatusEnum.NEW);
            addProduct("item2", BigDecimal.valueOf(8.99), 2, "Random Item2", CategoryEnum.ITEM_TYPE_2, ProductStatusEnum.PROMOTION);
        }

    }


    private void addRoles() {
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
    }

    private void addUser(String username, String email, String password, RoleEnum role) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setEmail(email);
        userEntity.setPassword(passwordEncoder.encode(password));

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setRole(role);
        userEntity.getRoles().add(roleEntity);

        userRepository.save(userEntity);

    }

    private void addProduct(String name, BigDecimal price, int quantity, String description, CategoryEnum category, ProductStatusEnum status) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(name);
        productEntity.setPrice(price);
        productEntity.setQuantity(quantity);
        productEntity.setDescription(description);
        productEntity.setProductCategory(category);
        productEntity.getStatus().add(status);

    }

}
