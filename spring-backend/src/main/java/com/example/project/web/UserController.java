package com.example.project.web;

import com.example.project.model.dto.view.MyProfileViewModel;
import com.example.project.model.dto.view.UserViewModel;
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
    public ResponseEntity<List<UserViewModel>> getAllUsers() {
        List<UserViewModel> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{username}")
    public ResponseEntity<UserViewModel> getUser(@PathVariable String username) {
        UserViewModel user = userService.getUser(username);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my-profile")
    public ResponseEntity<MyProfileViewModel> getMyProfile() {
        MyProfileViewModel myProfile = userService.getMyProfile();
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
