package com.example.project.web;

import com.example.project.payload.request.AddressRequest;
import com.example.project.payload.request.ProfileEditRequest;
import com.example.project.payload.response.AddressResponse;
import com.example.project.payload.response.ProfileResponse;
import com.example.project.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my-profile")
    public ResponseEntity<ProfileResponse> retrieveProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ProfileResponse myProfile = userService.getProfile(authentication.getName());
        if (myProfile == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myProfile, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my-address")
    public ResponseEntity<AddressResponse> retrieveAddress(@RequestParam String address) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        AddressResponse addressResponse = userService.getAddress(address, username);
        if (addressResponse == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(addressResponse, HttpStatus.OK);
    }


    @PreAuthorize("isAuthenticated()")
    @PutMapping("/my-profile/edit-profile")
    public ResponseEntity<ProfileResponse> updateProfile(@Valid @RequestBody ProfileEditRequest myProfileRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ProfileResponse myProfile = userService.editProfile(username, myProfileRequest);
        if (myProfile == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myProfile, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/my-profile/edit-address")
    public ResponseEntity<AddressResponse> updateAddress(@Valid @RequestBody AddressRequest addressRequest, @RequestParam String address) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        AddressResponse addressResponse = userService.editAddress(username, address, addressRequest);
        if (addressResponse == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(addressResponse, HttpStatus.OK);
    }
}
