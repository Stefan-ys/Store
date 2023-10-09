package com.example.project.service;

import com.example.project.payload.response.CommentResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface CommentService {

    // Create

    void commentProduct(ObjectId productId, String username, ObjectId userId, int rating, String comment);

    // Retrieve

    List<CommentResponse> getAllComments();

    // Update

    void editComment(ObjectId commentId, String comment);

    // Delete

    void deleteComment(ObjectId commentId);

    List<CommentResponse> getUserComments(ObjectId objectId);
}
