package com.example.project.model.embeddable;

import lombok.Data;
import org.bson.types.ObjectId;

import java.util.HashSet;
import java.util.Set;

@Data
public class ShoppingCart {
    private Set<ShoppingCartItem> items = new HashSet<>();

    public ShoppingCartItem getItem(ObjectId productId) {
        for (ShoppingCartItem cartItem : items) {
            if (cartItem.getProductId().equals(productId)) {
                return cartItem;
            }
        }
        return null;
    }

    public void addItem(ShoppingCartItem item) {
        for (ShoppingCartItem cartItem : items) {
            if (cartItem.equals(item)) {
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                return;
            }
        }
        items.add(item);
    }

    public void removeItem(ShoppingCartItem item) {
        items.remove(item);
    }
}
