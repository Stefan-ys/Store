package com.example.project.web;

import com.example.project.service.ProductService;
import com.example.project.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/admin")
public class AdminController {
    private final ProductService productService;
    private final UserService userService;




}
