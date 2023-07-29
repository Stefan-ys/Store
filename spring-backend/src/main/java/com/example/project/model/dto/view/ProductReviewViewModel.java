package com.example.project.model.dto.view;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProductReviewViewModel {
    private String username;
    private String comment;
    private int rating;
    private LocalDate reviewDate;
}
