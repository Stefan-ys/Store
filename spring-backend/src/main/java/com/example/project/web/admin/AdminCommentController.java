package com.example.project.web.admin;

import com.example.project.payload.response.CommentResponse;
import com.example.project.payload.response.ProductResponse;
import com.example.project.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/comment")
public class AdminCommentController {
    private final CommentService commentService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/all-products")
    public ResponseEntity<List<CommentResponse>> getAllComments() {
        try {
            List<CommentResponse> comments = commentService.getAllComments();
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
