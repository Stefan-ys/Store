package com.example.project.service;

import com.example.project.payload.request.AddressRequest;
import com.example.project.payload.request.ProfileEditRequest;
import com.example.project.payload.request.RegisterRequest;
import com.example.project.payload.response.AddressResponse;
import com.example.project.payload.response.ProfileResponse;
import com.example.project.payload.response.UserResponse;

import java.util.List;

public interface UserService {
    void signUp(RegisterRequest signUpBindingModel);

    List<UserResponse> getAllUsers();

    UserResponse getUser(String username);

    boolean containsUsername(String username);

    boolean containsEmail(String email);

    void updateUserActivity(String username);

    ProfileResponse getProfile(String username);

    ProfileResponse editProfile(String username, ProfileEditRequest myProfileRequest);

    AddressResponse getAddress(String address, String username);

    AddressResponse editAddress(String username, String address, AddressRequest addressRequest);
}
