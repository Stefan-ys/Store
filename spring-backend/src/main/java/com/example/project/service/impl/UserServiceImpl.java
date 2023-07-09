package com.example.project.service.impl;

import com.example.project.model.dto.binding.SignUpBindingModel;
import com.example.project.model.entity.UserEntity;
import com.example.project.model.entity.UserRole;
import com.example.project.model.enums.RoleEnum;
import com.example.project.repository.UserRepository;
import com.example.project.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    public void signUp(SignUpBindingModel signUpBindingModel) {
        UserEntity userEntity = modelMapper.map(signUpBindingModel, UserEntity.class);
        userEntity.setPassword(passwordEncoder.encode(signUpBindingModel.getPassword()));

        UserRole userRole = new UserRole();
        userRole.setRole(RoleEnum.USER);

        userEntity.getRoles().add(userRole);

        userRepository.save(userEntity);
    }
}
