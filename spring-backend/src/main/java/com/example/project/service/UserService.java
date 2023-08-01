package com.example.project.service;

import com.example.project.payload.request.RegisterRequest;
import com.example.project.payload.response.MyProfileResponse;
import com.example.project.payload.response.UserResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface UserService {
    void signUp(RegisterRequest signUpBindingModel);

    List<UserResponse> getAllUsers();

    UserResponse getUser(String username);

    boolean containsUsername(String username);

    boolean containsEmail(String email);

    void updateUserActivity(String username);

    MyProfileResponse getMyProfile();

    void addToCart(String username, ObjectId productId);

    void removeFromCart(String username, ObjectId productId);

    void adjustProductQuantity(String username, ObjectId productId, int quantity);
}
