package com.example.project.service;

import com.example.project.payload.request.AddressWithNoValidationRequest;
import com.example.project.payload.request.ProfileRequest;
import com.example.project.payload.request.RegisterRequest;
import com.example.project.payload.response.AddressResponse;
import com.example.project.payload.response.ProfileResponse;
import com.example.project.payload.response.UserResponse;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    // Create


    // Retrieve
    void signUp(RegisterRequest signUpBindingModel);

    Page<UserResponse> getAllUsers(Pageable pageable);
    List<UserResponse> getAllUsers();

    ProfileResponse getProfile(ObjectId userId);

    AddressResponse getAddress(String address, ObjectId userId);

    AddressResponse editAddress(ObjectId userId, String address, AddressWithNoValidationRequest addressRequest);

    void updateUserAuthorities(String userId, List<String> authorities);


    // Update

    void updateUserActivity(ObjectId userId);

    ProfileResponse editProfile(ObjectId userid, ProfileRequest myProfileRequest);

    // Delete

    void deleteUserById(String userId);

}
