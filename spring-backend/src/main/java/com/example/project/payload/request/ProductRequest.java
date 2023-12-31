package com.example.project.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProductRequest {
    @NotBlank(message = "product name is required")
    private String name;
    @NotBlank(message = "Product catalog number is required")
    private String catalogNumber;
    @NotEmpty(message = "Product price is required")
    private BigDecimal price;
    private List<String> pictures;
    @NotEmpty(message = "Product quantity is required")
    private int quantity;
    private String description;
    private List<String> status;
    @NotEmpty(message = "Product category is required")
    private String productCategory;
    private String manufacturer;
    @NotEmpty(message = "Product weight is required")
    private BigDecimal weight;
    private LocalDateTime expirationDate;
    private int productHeight = 0;
    private int productLength = 0;
    private int productWidth = 0;

}
