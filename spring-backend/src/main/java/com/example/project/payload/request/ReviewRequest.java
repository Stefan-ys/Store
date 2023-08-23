package com.example.project.payload.request;

import lombok.Data;

@Data
public class ReviewRequest {
    private String productId;
    private String comment;
    private Integer rating;
}
