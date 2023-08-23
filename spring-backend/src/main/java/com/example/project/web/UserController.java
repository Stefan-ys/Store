package com.example.project.web;

import com.example.project.configuration.security.services.UserDetailsImpl;
import com.example.project.payload.request.AddressWithNoValidationRequest;
import com.example.project.payload.request.ProfileRequest;
import com.example.project.payload.response.AddressResponse;
import com.example.project.payload.response.ProfileResponse;
import com.example.project.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        ProfileResponse myProfile = userService.getProfile(userId);
        if (myProfile == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myProfile, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my-address")
    public ResponseEntity<AddressResponse> retrieveAddress(@RequestParam String address) {
        ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        AddressResponse addressResponse = userService.getAddress(address, userId);
        if (addressResponse == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(addressResponse, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/my-profile")
    public ResponseEntity<ProfileResponse> updateProfile(@Valid @RequestBody ProfileRequest profileRequest) {
        ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        ProfileResponse myProfile = userService.editProfile(userId, profileRequest);
        if (myProfile == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(myProfile, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/my-address")
    public ResponseEntity<AddressResponse> updateAddress(@RequestBody AddressWithNoValidationRequest addressRequest, @RequestParam String address) {
        ObjectId userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        AddressResponse addressResponse = userService.editAddress(userId, address, addressRequest);
        if (addressResponse == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(addressResponse, HttpStatus.OK);
    }
}
