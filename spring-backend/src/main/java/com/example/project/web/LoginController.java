package com.example.project.web;

import com.example.project.model.dto.binding.LoginBindingModel;
import com.example.project.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class LoginController {
    private final UserService userService;
    private AuthenticationManager authenticationManager;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginBindingModel loginBindingModel) {

        return ResponseEntity.ok("Login successful");
    }
}
