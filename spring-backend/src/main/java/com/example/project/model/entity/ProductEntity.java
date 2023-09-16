package com.example.project.model.entity;

import com.example.project.model.embeddable.ProductDimensions;
import com.example.project.model.enums.ProductCategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.data.mongodb.core.mapping.FieldType.DECIMAL128;

@Document(collection = "products")
@Data
public class ProductEntity extends BaseEntity {
    @NotNull
    private String name;
    @NotNull
    private String catalogNumber;
    @NotNull
    @Field(targetType = DECIMAL128)
    private BigDecimal price;
    private List<String> images = new ArrayList<>();
    @NotNull
    private int quantity;
    private String description;
    private Set<ProductStatusEnum> status = new HashSet<>();
    private ProductCategoryEnum productCategory;
    private String manufacturer;
    private double rating;
    private Map<String, Integer> usersRating = new HashMap<>();
    @NotNull
    @Field(targetType = DECIMAL128)
    private BigDecimal weight;
    private int sells;
    private int views;
    private ProductDimensions dimensions = new ProductDimensions();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ProductEntity that = (ProductEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getId());
    }
}