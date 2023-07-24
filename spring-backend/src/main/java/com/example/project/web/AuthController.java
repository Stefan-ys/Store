package com.example.project.web;

import com.example.project.configuration.security.jwt.JwtUtils;
import com.example.project.configuration.security.services.UserDetailsImpl;
import com.example.project.model.dto.binding.LoginBindingModel;
import com.example.project.model.dto.binding.SignUpBindingModel;
import com.example.project.payload.response.MessageResponse;
import com.example.project.repository.UserRepository;
import com.example.project.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
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
@RequestMapping("/api/auth")
public class AuthController {

    final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final UserService userService;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticationUser(@Valid @RequestBody LoginBindingModel loginBindingModel) {
        System.out.println("LOGIN");
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginBindingModel.getUsername(), loginBindingModel.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        List<String> roles = userDetails
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(userService.getUser(loginBindingModel.getUsername()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpBindingModel signUpBindingModel) {

        if (userService.containsUsername(signUpBindingModel.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(String.format("Error: Username - %s is already taken!", signUpBindingModel.getUsername())));
        }
        if (userService.containsEmail(signUpBindingModel.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(String.format("Error: Email - %s is already taken!", signUpBindingModel.getEmail())));
        }
        if (!signUpBindingModel.getPassword().equals(signUpBindingModel.getConfirmPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Passwords do not match"));
        }
        userService.signUp(signUpBindingModel);

        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }
}
