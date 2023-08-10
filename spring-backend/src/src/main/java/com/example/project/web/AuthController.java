package com.example.project.web;

import com.example.project.configuration.security.jwt.JwtUtils;
import com.example.project.configuration.security.services.UserDetailsImpl;
import com.example.project.payload.request.LoginRequest;
import com.example.project.payload.request.RegisterRequest;
import com.example.project.payload.response.JwtResponse;
import com.example.project.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;


    @PostMapping("/login")
    public ResponseEntity<?> authenticationUser(@Valid @RequestBody LoginRequest loginBindingModel) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginBindingModel.getUsername(), loginBindingModel.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);


            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);


            List<String> roles = userDetails
                    .getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            JwtResponse jwtResponse = new JwtResponse();
            jwtResponse.setAccessToken(jwtUtils.generateJwtTokenFromUsername(userDetails.getUsername()));
            jwtResponse.setRoles(roles);
            jwtResponse.setUsername(userDetails.getUsername());
            jwtResponse.setEmail(userDetails.getEmail());
            jwtResponse.setId(userDetails.getId());


            userService.updateUserActivity(userDetails.getUsername());

            return ResponseEntity.ok().body(jwtResponse);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong username or password.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpBindingModel) {

        if (userService.containsUsername(signUpBindingModel.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(String.format("Error: Username - %s is already taken!", signUpBindingModel.getUsername()));
        }
        if (userService.containsEmail(signUpBindingModel.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(String.format("Error: Email - %s is already taken!", signUpBindingModel.getEmail()));
        }
        if (!signUpBindingModel.getPassword().equals(signUpBindingModel.getConfirmPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Passwords do not match");
        }

        userService.signUp(signUpBindingModel);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
//        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok()
                .body("You've been signed out!");
    }
}
