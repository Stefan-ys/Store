package com.example.project.web;

import com.example.project.payload.request.MyProfileUpdateRequest;
import com.example.project.payload.response.MyProfileResponse;
import com.example.project.payload.response.UserResponse;
import com.example.project.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{username}")
    public ResponseEntity<UserResponse> getUser(@PathVariable String username) {
        UserResponse user = userService.getUser(username);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my-profile")
    public ResponseEntity<MyProfileResponse> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyProfileResponse myProfile = userService.getMyProfile(authentication.getName());
        return ResponseEntity.ok(myProfile);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/my-profile")
    public ResponseEntity<MyProfileResponse> updateProfile(@Valid @RequestBody MyProfileUpdateRequest myProfileRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyProfileResponse myProfile = userService.updateMyProfile(authentication.getName(), myProfileRequest);
        return ResponseEntity.ok(myProfile);
    }

    @PostMapping("/{username}/add-to-cart")
    public ResponseEntity<Void> addToCart(@PathVariable String username, @RequestParam("productId") ObjectId productId) {
        userService.addToCart(username, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{username}/remove-from-cart")
    public ResponseEntity<Void> removeFromCart(@PathVariable String username, @RequestParam("productId") ObjectId productId) {
        userService.removeFromCart(username, productId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{username}/adjust-quantity")
    public ResponseEntity<Void> adjustProductQuantity(@PathVariable String username, @RequestParam("productId") ObjectId productId,
                                                      @RequestParam("quantity") int quantity) {
        userService.adjustProductQuantity(username, productId, quantity);
        return ResponseEntity.ok().build();
    }
}
