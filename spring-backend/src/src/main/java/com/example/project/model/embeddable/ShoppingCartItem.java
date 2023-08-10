package com.example.project.model.embeddable;

import lombok.Data;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.util.Objects;

@Data
public class ShoppingCartItem {
    private ObjectId productId;
    private String productName;
    private BigDecimal price;
    private int quantity;
    private double weight;

    @Override
    public boolean equals(Object o) {
        if (this.equals(o)) {
            return true;
        }
        if (o == null || !getClass().equals(o.getClass())) {
            return false;
        }
        ShoppingCartItem that = (ShoppingCartItem) o;
        return Objects.equals(productId, that.productId);

    }

    @Override
    public int hashCode() {
        return Objects.hash(productId);
    }
}
