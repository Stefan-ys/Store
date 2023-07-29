package com.example.project.model.dto.view;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ShoppingCartViewModel {
    private BigDecimal totalPrice;
    private double totalWeight;
    private List<ItemViewModel> items;
}
