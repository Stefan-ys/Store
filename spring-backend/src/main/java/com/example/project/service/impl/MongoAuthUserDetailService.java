package com.example.project.service.impl;

import com.example.project.model.entity.UserEntity;
import com.example.project.model.enums.RoleEnum;
import com.example.project.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashSet;
import java.util.Set;

public class MongoAuthUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public MongoAuthUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByUsernameIgnoreCase(username);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

        userEntity.getAuthorities()
                .forEach(roleEnum -> {
                    grantedAuthorities.add(new SimpleGrantedAuthority(roleEnum.name()));
                });
        return new User(userEntity.getUsername(), userEntity.getPassword(), grantedAuthorities);
    }
//
//    private UserDetails map(UserEntity userEntity) {
//        return new User(
//                userEntity.getUsername(),
//                userEntity.getPassword(),
//                extractAuthorities(userEntity));
//    }
//
//    private List<GrantedAuthority> extractAuthorities(UserEntity userEntity) {
//        return userEntity
//                .getAuthorities()
//                .stream()
//                .map(this::mapRole)
//                .toList();
//    }
//
//    private GrantedAuthority mapRole(RoleEnum roleEnum) {
//        return new SimpleGrantedAuthority("ROLE_" + roleEnum.name());
//    }
}
