package com.example.project.model.entity;

import com.example.project.model.embeddable.ProductReview;
import com.example.project.model.enums.CategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "products")
@Data
public class ProductEntity extends BaseEntity {
    @NotNull
    private String name;
    @NotNull
    private String catalogNumber;
    @NotNull
    private BigDecimal price;
    private int quantity;
    private String description;
    private Set<ProductStatusEnum> status = new HashSet<>();
    private CategoryEnum productCategory;
    private String manufacturer;
    private int rating;
    private BigDecimal weight;
    private LocalDate expirationDate;
    private Set<ProductReview> reviews = new HashSet<>();
}
