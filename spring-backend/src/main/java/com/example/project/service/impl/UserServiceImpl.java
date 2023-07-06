package com.example.project.service.impl;

import com.example.project.model.dto.service.SignUpServiceModel;
import com.example.project.model.entity.UserEntity;
import com.example.project.repository.UserRepository;
import com.example.project.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    public void registerUser(SignUpServiceModel signUpServiceModel) {
        UserEntity userEntity = modelMapper.map(signUpServiceModel, UserEntity.class);
        String encodePassword = passwordEncoder.encode(signUpServiceModel.getPassword());
        userEntity.setPassword(encodePassword);
        userRepository.save(userEntity);
    }

}
