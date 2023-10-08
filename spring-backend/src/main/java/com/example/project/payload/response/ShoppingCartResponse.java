package com.example.project.payload.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class ShoppingCartResponse {
    private BigDecimal totalPrice;
    private BigDecimal totalWeight;
    private int totalProducts;
    private List<ShoppingCartProductResponse> products = new ArrayList<>();
}
