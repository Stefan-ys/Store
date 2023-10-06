package com.example.project.model.embeddable;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProductReview {
    private String username;
    private String comment;
    private int rating;
    private LocalDate reviewDate;
}
