package com.example.project.web;

import com.example.project.model.dto.binding.SignUpBindingModel;

import com.example.project.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class SingUpController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@Valid @RequestBody SignUpBindingModel signUpBindingModel) {
        System.out.println("Sign Up");
        try {
            userService.signUp(signUpBindingModel);
            return ResponseEntity.ok("Sign Up Successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid Request");
        }
    }

}
