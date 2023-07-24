package com.example.project.service.impl;

import com.example.project.model.dto.binding.SignUpBindingModel;
import com.example.project.model.dto.view.UserViewModel;
import com.example.project.model.entity.UserEntity;
import com.example.project.model.entity.RoleEntity;
import com.example.project.model.enums.RoleEnum;
import com.example.project.repository.RoleRepository;
import com.example.project.repository.UserRepository;
import com.example.project.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(signUpBindingModel.getUsername());
        userEntity.setEmail(signUpBindingModel.getEmail());
        userEntity.setPassword(passwordEncoder.encode(signUpBindingModel.getPassword()));
        userEntity.getRoles().add(roleRepository.findByRole(RoleEnum.USER));

        userRepository.save(userEntity);
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

    @Override
    public boolean containsUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @Override
    public boolean containsEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
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

}
