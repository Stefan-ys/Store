package com.example.project.model.dto.view;

import lombok.Data;
import org.bson.types.ObjectId;

import java.math.BigDecimal;

@Data
public class ItemViewModel {
    private ObjectId productId;
    private String productName;
    private BigDecimal price;
    private int quantity;
    private double weight;
}
