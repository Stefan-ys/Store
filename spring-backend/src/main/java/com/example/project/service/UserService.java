package com.example.project.service;

import com.example.project.payload.request.AddressWithNoValidationRequest;
import com.example.project.payload.request.ProfileRequest;
import com.example.project.payload.request.RegisterRequest;
import com.example.project.payload.response.AddressResponse;
import com.example.project.payload.response.ProfileResponse;
import com.example.project.payload.response.UserResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface UserService {

    void signUp(RegisterRequest signUpBindingModel);

    List<UserResponse> getAllUsers();

    UserResponse getUser(ObjectId userId);

    boolean containsUsername(String username);

    boolean containsEmail(String email);

    void updateUserActivity(ObjectId userId);

    ProfileResponse getProfile(ObjectId userId);

    ProfileResponse editProfile(ObjectId userid, ProfileRequest myProfileRequest);

    AddressResponse getAddress(String address, ObjectId userId);

    AddressResponse editAddress(ObjectId userId, String address, AddressWithNoValidationRequest addressRequest);
}
