package com.example.project.web;

import com.example.project.configuration.security.jwt.JwtUtils;
import com.example.project.configuration.security.services.UserDetailsImpl;
import com.example.project.model.dto.binding.LoginBindingModel;
import com.example.project.model.dto.binding.SignUpBindingModel;
import com.example.project.model.dto.view.UserViewModel;
import com.example.project.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticationUser(@Valid @RequestBody LoginBindingModel loginBindingModel) {
        try {
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

            UserViewModel userViewModel = userService.getUser(loginBindingModel.getUsername());
            userViewModel.setRoles(roles);

            userService.updateUserActivity(userDetails.getUsername());
            System.out.println("Login success");
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(userViewModel);
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpBindingModel signUpBindingModel) {

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

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("You've been signed out!");
    }
}
