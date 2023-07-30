package com.example.project.web;

import com.example.project.model.dto.binding.ProductBindingModel;
import com.example.project.model.dto.view.ProductViewModel;
import com.example.project.model.dto.view.UserViewModel;
import com.example.project.service.ProductService;
import com.example.project.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/admin")
public class AdminController {
    private final ProductService productService;
    private final UserService userService;




}
