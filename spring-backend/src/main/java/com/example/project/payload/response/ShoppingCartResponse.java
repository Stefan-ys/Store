package com.example.project.payload.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ShoppingCartResponse {
    private BigDecimal totalPrice;
    private BigDecimal totalWeight;
    private List<ShoppingCartProductResponse> products;
}
