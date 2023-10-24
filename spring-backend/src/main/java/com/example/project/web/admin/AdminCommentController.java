package com.example.project.web.admin;

import com.example.project.payload.response.CommentResponse;
import com.example.project.service.CommentService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/comments")
public class AdminCommentController {
    private final CommentService commentService;

    // Create

    // Retrieve


    @GetMapping("/all-comments")
    public ResponseEntity<List<CommentResponse>> getAllComments() {
        try {
            List<CommentResponse> comments = commentService.getAllComments();
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/comments-by-user{userId}")
    public ResponseEntity<List<CommentResponse>> getUserComments(@PathVariable("userId") String userId) {
        try {
            List<CommentResponse> comments = commentService.getUserComments(new ObjectId(userId));
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update

    // Delete

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete-comment{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") String commentId) {
        try {
            commentService.deleteComment(new ObjectId(commentId));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
