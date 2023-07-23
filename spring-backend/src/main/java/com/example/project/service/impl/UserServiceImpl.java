package com.example.project.service.impl;

import com.example.project.model.dto.binding.SignUpBindingModel;
import com.example.project.model.dto.view.UserViewModel;
import com.example.project.model.entity.UserEntity;
import com.example.project.model.entity.RoleEntity;
import com.example.project.model.enums.RoleEnum;
import com.example.project.repository.RoleRepository;
import com.example.project.repository.UserRepository;
import com.example.project.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    public void signUp(SignUpBindingModel signUpBindingModel) {
        UserEntity userEntity = UserEntity.builder()
                .username(signUpBindingModel.getUsername())
                .email(signUpBindingModel.getEmail())
                .password(passwordEncoder.encode(signUpBindingModel.getPassword()))
                .build();

        userEntity.getRoles().add(roleRepository.findByRole(RoleEnum.USER));

    }

    @Override
    public List<UserViewModel> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToViewModel).toList();
    }

    @Override
    public String getRole(List<String> roles) {
        if (roles.contains("ADMIN")) {
            return "ADMIN";
        }
        if (roles.contains("MODERATOR")) {
            return "MODERATOR";
        }
        return "USER";
    }

    @Override
    public UserViewModel getUser(String username) {
        UserEntity userEntity = userRepository.findByUsername(username)
                .orElseThrow();
        return convertToViewModel(userEntity);
    }

    private UserViewModel convertToViewModel(UserEntity userEntity) {
        UserViewModel viewModel = modelMapper.map(userEntity, UserViewModel.class);
        viewModel.setRole("USER");
        for (RoleEntity userRole : userEntity.getRoles()) {
            if (viewModel.getRole().equals("USER") && userRole.getRole().equals(RoleEnum.MODERATOR)) {
                viewModel.setRole("MODERATOR");
            }
            if (userRole.getRole().equals(RoleEnum.ADMIN)) {
                viewModel.setRole("ADMIN");
            }
        }
        return viewModel;
    }


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
