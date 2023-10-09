package com.example.project.payload.response;

import lombok.Data;

import java.math.BigDecimal;

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
    private int images;
    private String description;
    private String status;
    private String productCategory;
    private String manufacturer;
    private String rating;
    private int comments;
    private int sells;
    private int views;
    private String dimensions;
}
