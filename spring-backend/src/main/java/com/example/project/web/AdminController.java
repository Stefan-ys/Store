package com.example.project.web;

import com.example.project.service.ProductService;
import com.example.project.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("api/admin")
public class AdminController {
}
