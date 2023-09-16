package com.example.project.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.*;

@Data
public class ProductResponse {
    private String id;
    private String name;
    private String catalogNumber;
    private BigDecimal price;
    private List<String> images;
    private String description;
    private List<String> status;
    private String productCategory;
    private String manufacturer;
    private double rating;
    private int usersRatingCount;
    private String dimensions;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<CommentResponse> comments = new ArrayList<>();

}
