package com.example.project.model.embeddable;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class ProductSummary {
    private int quantity = 0;
    private BigDecimal sumPrice = BigDecimal.ZERO;
    private BigDecimal sumWeight = BigDecimal.ZERO;

    public void setAll(int quantity, BigDecimal sumPrice, BigDecimal sumWeight) {
        this.quantity = quantity;
        this.sumPrice = sumPrice;
        this.sumWeight = sumWeight;
    }
}

