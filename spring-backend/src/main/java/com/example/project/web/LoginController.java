package com.example.project.web;

import com.example.project.model.dto.binding.LoginBindingModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginBindingModel loginBindingModel) {
        return ResponseEntity.ok("Login successful");
    }
}
