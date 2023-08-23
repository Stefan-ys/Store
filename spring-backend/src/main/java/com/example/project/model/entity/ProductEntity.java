package com.example.project.model.entity;

import com.example.project.model.enums.CategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

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

    //    private List<GridFSFile> pictures;
    @NotNull
    private int quantity;
    private String description;
    private Set<ProductStatusEnum> status = new HashSet<>();
    private CategoryEnum productCategory;
    private String manufacturer;
    private double rating;
    private Map<String, Integer> usersRating = new HashMap<>();
    @NotNull
    private BigDecimal weight;
    private LocalDate expirationDate;

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