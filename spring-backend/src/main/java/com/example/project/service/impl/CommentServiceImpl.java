package com.example.project.service.impl;

import com.example.project.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CommentServiceImpl {
    private final CommentRepository commentRepository;
}
