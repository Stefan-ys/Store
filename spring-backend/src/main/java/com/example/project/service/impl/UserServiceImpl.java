package com.example.project.service.impl;


import com.example.project.model.embeddable.Address;
import com.example.project.payload.request.AddressWithNoValidationRequest;
import com.example.project.payload.request.ProfileRequest;
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
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.project.util.DateUtils.formatLocalDateTime;
import static com.example.project.util.DateUtils.getTimeBetween;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


    // Create

    @Override
    public void signUp(RegisterRequest signUpBindingModel) {
        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(signUpBindingModel.getUsername());
        userEntity.setEmail(signUpBindingModel.getEmail());
        userEntity.setPassword(passwordEncoder.encode(signUpBindingModel.getPassword()));
        userEntity.getRoles().add(roleRepository.findByRole(RoleEnum.USER));

        userRepository.save(userEntity);
    }

    // Retrieve

    @Override
    public Page<UserResponse> getAllUsers(Pageable paging) {
        Page<UserEntity> users = userRepository.findAll(paging);
        List<UserResponse> productResponses = users.getContent().stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, users.getTotalElements());
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }


    @Override
    public ProfileResponse getProfile(ObjectId userId) {
        UserEntity userEntity = getUserById(userId);
        return modelMapper.map(userEntity, ProfileResponse.class);

    }

    // Update
    @Override
    public void updateUserActivity(ObjectId userId) {
        UserEntity userEntity = getUserById(userId);
        userEntity.setVisits(userEntity.getVisits() + 1);
        userEntity.setLastDateActive(LocalDateTime.now());
        userRepository.save(userEntity);
    }

    @Override
    public ProfileResponse editProfile(ObjectId userid, ProfileRequest myProfileRequest) {
        UserEntity userEntity = getUserById(userid);
        if (userRepository.existsByEmailIgnoreCase(myProfileRequest.getEmail())
                && !userEntity.getEmail().equals(myProfileRequest.getEmail())) {
            throw new IllegalArgumentException("Email address already taken!");
        }
        userEntity.setEmail(myProfileRequest.getEmail());
        userEntity.setPhoneNumber(myProfileRequest.getPhoneNumber());
        userEntity.setFirstName(myProfileRequest.getFirstName());
        userEntity.setLastName(myProfileRequest.getLastName());


        UserEntity updatedUserEntity = userRepository.save(userEntity);

        return modelMapper.map(updatedUserEntity, ProfileResponse.class);

    }

    @Override
    public AddressResponse getAddress(String address, ObjectId userId) {
        UserEntity userEntity = getUserById(userId);
        if (address.equals("payment")) {
            return modelMapper.map(userEntity.getPaymentAddress(), AddressResponse.class);
        }
        if (address.equals("delivery")) {
            return modelMapper.map(userEntity.getDeliveryAddress(), AddressResponse.class);
        }
        return null;
    }

    @Override
    public AddressResponse editAddress(ObjectId userId, String address, AddressWithNoValidationRequest addressRequest) {
        UserEntity userEntity = getUserById(userId);
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

    @Override
    public void updateUserAuthorities(String userId, List<String> authorities) {

    }

    // Delete

    @Override
    public void deleteUserById(String userId) {

    }

    private UserResponse convertToUserResponse(UserEntity userEntity) {
        UserResponse userResponse = modelMapper.map(userEntity, UserResponse.class);
        userResponse.setId(userEntity.getId().toString());
        userResponse.setRoles(
                userEntity.getRoles()
                        .stream()
                        .map(roleEntity -> roleEntity.getRole().toString())
                        .collect(Collectors.joining(", "))
        );

        LocalDateTime currentDate = LocalDateTime.now();
        userResponse.setCreatedDate(String.format("%s (%s ago)", formatLocalDateTime(userEntity.getCreatedDate()), getTimeBetween(userEntity.getCreatedDate(), currentDate)));
        userResponse.setLastActiveDate(String.format("%s (%s ago)", formatLocalDateTime(userEntity.getLastDateActive()), getTimeBetween(userEntity.getLastDateActive(), currentDate)));

        return userResponse;
    }


    private UserEntity getUserById(ObjectId userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + userId));
    }
}
