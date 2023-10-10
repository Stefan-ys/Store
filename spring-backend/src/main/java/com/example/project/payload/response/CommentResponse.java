package com.example.project.payload.response;

import lombok.Data;

@Data
public class CommentResponse {
    private String username;
    private int rating;
    private String comment;
    private String reviewDate;
}
