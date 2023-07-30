package com.example.project.model.dto.binding;

import com.example.project.model.enums.CategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import com.mongodb.client.gridfs.model.GridFSFile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.List;

@Data
public class ProductBindingModel {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Catalog number is required")
    private String catalogNumber;
    @NotNull(message = "Price is required")
    private BigDecimal price;
//    private List<GridFSFile> pictures;
    @NotNull(message = "Quantity is required")
    private int quantity;
    private String description;
    private Set<String> status = new HashSet<>();
    @NotNull(message = "Product category is required")
    private String productCategory;
    private String manufacturer;
    private int rating;
    private double weight;
    private LocalDate expirationDate;
}
