package com.example.project.payload.response;

import lombok.Data;
import org.bson.types.ObjectId;

import java.math.BigDecimal;

@Data
public class ItemResponse {
    private ObjectId productId;
    private String productName;
    private BigDecimal price;
    private int quantity;
    private double weight;
}
