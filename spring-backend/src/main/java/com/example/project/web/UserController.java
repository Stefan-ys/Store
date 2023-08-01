package com.example.project.web;

import com.example.project.payload.response.MyProfileResponse;
import com.example.project.payload.response.UserResponse;
import com.example.project.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

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
        MyProfileResponse myProfile = userService.getMyProfile();
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
