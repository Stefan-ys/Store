package com.example.project.payload.response;

import com.mongodb.client.gridfs.model.GridFSFile;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductStoreResponse {
    private String name;
    private String catalogNumber;
    private BigDecimal price;
    private List<GridFSFile> pictures;
    private String description;
    private List<String> status;
    private String productCategory;
    private String manufacturer;
    private int rating;
    private List<ProductReviewResponse> reviews;
}
