package com.example.project.service.impl;


import com.example.project.model.embeddable.Address;
import com.example.project.payload.request.AddressRequest;
import com.example.project.payload.request.ProfileEditRequest;
import com.example.project.payload.request.RegisterRequest;
import com.example.project.payload.response.AddressResponse;
import com.example.project.payload.response.ProfileResponse;
import com.example.project.payload.response.UserResponse;
import com.example.project.model.entity.UserEntity;
import com.example.project.model.enums.RoleEnum;
import com.example.project.repository.RoleRepository;
import com.example.project.repository.UserRepository;
import com.example.project.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


    @Override
    public void signUp(RegisterRequest signUpBindingModel) {
        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(signUpBindingModel.getUsername());
        userEntity.setEmail(signUpBindingModel.getEmail());
        userEntity.setPassword(passwordEncoder.encode(signUpBindingModel.getPassword()));
        userEntity.getRoles().add(roleRepository.findByRole(RoleEnum.USER));

        userRepository.save(userEntity);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(this::convertToViewModel).toList();
    }


    @Override
    public UserResponse getUser(String username) {
        UserEntity userEntity = getUserByUsername(username);
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

    @Override
    public void updateUserActivity(String username) {
        UserEntity userEntity = getUserByUsername(username);

        userEntity.setLastDateActive(LocalDate.now());
        userRepository.save(userEntity);
    }

    @Override
    public ProfileResponse getProfile(String username) {
        UserEntity userEntity = getUserByUsername(username);
        return modelMapper.map(userEntity, ProfileResponse.class);

    }

    @Override
    public ProfileResponse editProfile(String username, ProfileEditRequest myProfileRequest) {
        UserEntity userEntity = getUserByUsername(username);

        userEntity.setEmail(myProfileRequest.getEmail());
        userEntity.setPhoneNumber(myProfileRequest.getPhoneNumber());
        userEntity.setFirstName(myProfileRequest.getFirstName());
        userEntity.setLastName(myProfileRequest.getLastName());

        UserEntity updatedUserEntity = userRepository.save(userEntity);

        return modelMapper.map(updatedUserEntity, ProfileResponse.class);

    }

    @Override
    public AddressResponse getAddress(String address, String username) {
        UserEntity userEntity = getUserByUsername(username);
        if (address.equals("payment")) {
            return modelMapper.map(userEntity.getPaymentAddress(), AddressResponse.class);
        }
        if (address.equals("delivery")) {
            return modelMapper.map(userEntity.getDeliveryAddress(), AddressResponse.class);
        }
        return null;
    }

    @Override
    public AddressResponse editAddress(String username, String address, AddressRequest addressRequest) {
        UserEntity userEntity = getUserByUsername(username);
        if (address.equals("payment")) {
            userEntity.setPaymentAddress(modelMapper.map(addressRequest, Address.class));
            userRepository.save(userEntity);
            return modelMapper.map(userEntity.getPaymentAddress(), AddressResponse.class);
        }
        if (address.equals("delivery")) {
            userEntity.setDeliveryAddress(modelMapper.map(addressRequest, Address.class));
            userRepository.save(userEntity);
            return modelMapper.map(userEntity.getPaymentAddress(), AddressResponse.class);
        }
        return null;
    }


    private UserResponse convertToViewModel(UserEntity userEntity) {
        UserResponse viewModel = modelMapper.map(userEntity, UserResponse.class);
        viewModel.setRoles(userEntity
                .getRoles()
                .stream()
                .map(role -> role.getRole().toString())
                .collect(Collectors.toList()));
        LocalDate currentDate = LocalDate.now();
        LocalDate createdDate = userEntity.getCreatedDate();
        LocalDate activeDate = userEntity.getLastDateActive();

        viewModel.setCreatedAt(createdDate +
                String.format("(%s days since)", ChronoUnit.DAYS.between(currentDate, currentDate)));
        viewModel.setLastActiveAt(activeDate +
                String.format("(%s days since)", ChronoUnit.DAYS.between(activeDate, currentDate)));

        return viewModel;
    }

    private UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));
    }
}
