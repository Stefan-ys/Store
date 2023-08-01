package com.example.project.payload.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class ProductResponse {
    private String name;
    private String catalogNumber;
    private BigDecimal price;
//    private List<GridFSFile> pictures;
    private int quantity;
    private String description;
    private List<String> status;
    private String productCategory;
    private String manufacturer;
    private int rating;
    private double weight;
    private LocalDate expirationDate;
    private List<ProductReviewResponse> reviews;
}