package com.example.project.service.impl;

import com.example.project.model.entity.CommentEntity;
import com.example.project.payload.response.CommentResponse;
import com.example.project.repository.CommentRepository;
import com.example.project.service.CommentService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;

    // Create
    @Override
    public void commentProduct(ObjectId productId, String username, ObjectId userId, int rating, String comment) {
        comment = comment.trim();
        if (comment.length() == 0) {
            return;
        }
        if (comment.length() > 300) {
            comment = comment.substring(0, 300);
        }

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setProductId(productId);
        commentEntity.setUsername(username);
        commentEntity.setRating(rating);
        commentEntity.setComment(comment);
        commentEntity.setUserId(userId);

        commentRepository.save(commentEntity);
    }

    // Retrieve

    @Override
    public List<CommentResponse> getAllComments() {
        return commentRepository
                .findAll()
                .stream()
                .map(comment -> modelMapper.map(comment, CommentResponse.class))
                .collect(Collectors.toList());
    }


    @Override
    public List<CommentResponse> getUserComments(ObjectId userId) {
        return commentRepository
                .findAllByUserId(userId)
                .stream()
                .map(comment -> modelMapper.map(comment, CommentResponse.class))
                .collect(Collectors.toList());
    }

    // Update

    @Override
    public void editComment(ObjectId commentId, String comment) {
        CommentEntity commentEntity = getCommentById(commentId);
        commentEntity.setComment(comment);
        commentRepository.save(commentEntity);
    }

    // Delete

    @Override
    public void deleteComment(ObjectId commentId) {
        commentRepository.deleteById(commentId);
    }


    // Helpers

    private CommentEntity getCommentById(ObjectId commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("No comment found with ID: " + commentId));
    }

}
