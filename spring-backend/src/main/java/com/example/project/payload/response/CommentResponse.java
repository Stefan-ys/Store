package com.example.project.payload.response;

import lombok.Data;

import java.time.LocalDate;
@Data
public class CommentResponse {
    private String username;
    private int rating;
    private String comment;
    private LocalDate reviewDate;
}
