package com.example.project.service.impl;

import com.example.project.model.entity.CommentEntity;
import com.example.project.repository.CommentRepository;
import com.example.project.service.CommentService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;

    @Override
    public void commentProduct(ObjectId productId, String username, int rating, String comment) {
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

        commentRepository.save(commentEntity);
    }
}
