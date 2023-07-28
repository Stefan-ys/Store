package com.example.project.web;

import com.example.project.model.dto.view.MyProfileViewModel;
import com.example.project.model.dto.view.UserViewModel;
import com.example.project.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserViewModel> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public MyProfileViewModel getProfile(){
        return userService.getMyProfile();
    }

}
