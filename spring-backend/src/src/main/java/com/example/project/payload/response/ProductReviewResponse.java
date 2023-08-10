package com.example.project.payload.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProductReviewResponse {
    private String username;
    private String comment;
    private int rating;
    private LocalDate reviewDate;
}
