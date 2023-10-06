package com.example.project.web;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/home")
public class HomeController {

    @GetMapping()
    public String home() {
        return "Hello world!";
    }

}
