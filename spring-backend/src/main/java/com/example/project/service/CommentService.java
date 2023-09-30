package com.example.project.service;

import com.example.project.payload.response.CommentResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface CommentService {

    void commentProduct(ObjectId productId, String username, int rating, String comment);

    List<CommentResponse> getAllComments();
}
