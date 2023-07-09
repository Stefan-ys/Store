package com.example.project.service.impl;

import com.example.project.model.entity.UserEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.stream.Collectors;

public class UserDetailsImpl extends User {
    public UserDetailsImpl(UserEntity userEntity) {
        super(userEntity.getUsername(), userEntity.getPassword(),
                userEntity.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRole().name()))
                        .collect(Collectors.toList()));
    }
}
