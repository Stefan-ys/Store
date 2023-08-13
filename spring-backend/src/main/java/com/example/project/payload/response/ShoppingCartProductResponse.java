package com.example.project.payload.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ShoppingCartProductResponse {
    private String productId;
    private String productName;
    private BigDecimal price;
    private int quantity;
    private BigDecimal weight;
}
