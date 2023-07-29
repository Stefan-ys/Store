package com.example.project.service;

import com.example.project.model.dto.binding.SignUpBindingModel;
import com.example.project.model.dto.view.MyProfileViewModel;
import com.example.project.model.dto.view.UserViewModel;
import org.bson.types.ObjectId;

import java.util.List;

public interface UserService {
    void signUp(SignUpBindingModel signUpBindingModel);

    List<UserViewModel> getAllUsers();

    UserViewModel getUser(String username);

    boolean containsUsername(String username);

    boolean containsEmail(String email);

    void updateUserActivity(String username);

    MyProfileViewModel getMyProfile();

    void addToCart(String username, ObjectId productId);

    void removeFromCart(String username, ObjectId productId);

    void adjustProductQuantity(String username, ObjectId productId, int quantity);
}
