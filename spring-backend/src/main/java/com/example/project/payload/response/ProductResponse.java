package com.example.project.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mongodb.client.gridfs.model.GridFSFile;
import lombok.Data;

import java.math.BigDecimal;
import java.util.*;

@Data
public class ProductResponse {
    private String id;
    private String name;
    private String catalogNumber;
    private BigDecimal price;
    private List<GridFSFile> pictures;
    private String description;
    private List<String> status;
    private String productCategory;
    private String manufacturer;
    private double rating;
    private int usersRatingCount;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<CommentResponse> comments = new ArrayList<>();

}
