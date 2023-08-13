package com.example.project.service;

import com.example.project.payload.response.ShoppingCartResponse;
import org.bson.types.ObjectId;

public interface ShoppingCartService {
    public ShoppingCartResponse getShoppingCart(String username);

    public void addProductToCart(ObjectId productId, String username);

    public void removeProductFromCart(ObjectId productId, String username);

    public void removeAllProductsFromCart(String username);

    public void setProductQuantity(ObjectId productId, String username, int quantity);

    public void transferProductsToCart(String username, ShoppingCartResponse products);
}
