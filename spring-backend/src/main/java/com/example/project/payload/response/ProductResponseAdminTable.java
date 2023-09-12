package com.example.project.payload.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductResponseAdminTable {
    private String id;
    private String name;
    private String dateAdded;
    private String editedDate;
    private String catalogNumber;
    private BigDecimal price;
    private BigDecimal weight;
    private int quantity;
    private int pictures;
    private String description;
    private String status;
    private String productCategory;
    private String manufacturer;
    private double rating;
    private int usersRatingCount;
    private int comments;
    private int sells;
    private int views;
    private String dimensions;
}
