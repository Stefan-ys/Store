package com.example.project.service.impl;

import com.example.project.model.entity.UserEntity;
import com.example.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserEntity userEntity = userRepository.findByUsernameIgnoreCase(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return new UserDetailsImpl(userEntity);
    }
}
