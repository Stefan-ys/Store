package com.example.project.model.embeddable;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class ShoppingCart {
    private Set<ShoppingCartItem> items = new HashSet<>();

    public void addItem(ShoppingCartItem item) {
        for (ShoppingCartItem cartItem : items) {
            if (cartItem.equals(item)) {
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                return;
            }
        }
        items.add(item);
    }
}
