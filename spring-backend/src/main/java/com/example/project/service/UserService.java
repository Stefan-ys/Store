package com.example.project.service;

import com.example.project.model.dto.binding.SignUpBindingModel;
import com.example.project.model.dto.view.UserViewModel;

import java.util.List;

public interface UserService {
    void signUp(SignUpBindingModel signUpBindingModel);

    List<UserViewModel> getAllUsers();

    String getRole(List<String> roles);

    Object getUser(String username);

    boolean containsUsername(String username);

    boolean containsEmail(String email);
}
