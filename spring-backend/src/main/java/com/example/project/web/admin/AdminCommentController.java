package com.example.project.web.admin;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/comment")
public class AdminCommentController {

}