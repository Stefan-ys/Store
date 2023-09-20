package com.example.project.web;

import com.example.project.service.CommentService;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/product")
public class CommentController {
   private CommentService commentService;


}
