package com.example.project.service.impl;

import com.example.project.repository.CommentRepository;
import com.example.project.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
}
