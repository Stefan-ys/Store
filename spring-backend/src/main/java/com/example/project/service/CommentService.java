package com.example.project.service;

import org.bson.types.ObjectId;

public interface CommentService {

    void commentProduct(ObjectId productId, String username, int rating, String comment);
}
