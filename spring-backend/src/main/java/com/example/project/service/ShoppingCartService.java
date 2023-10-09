package com.example.project.service;

import com.example.project.payload.response.ShoppingCartResponse;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Map;

public interface ShoppingCartService {

    // Create

    // Retrieve

    ShoppingCartResponse getShoppingCart(ObjectId userId);
    ShoppingCartResponse getTempShoppingCart(Map<String, Integer> productsIds);

    // Update
    void transferProductsToCart(Map<String, Integer> products, ObjectId userId);
    void addProductToCart(ObjectId productId, ObjectId userId);
    void setProductQuantity(ObjectId productId, ObjectId userId, int quantity);

    // Delete

    void removeProductFromCart(ObjectId productId, ObjectId userId);
    void removeAllProductsFromCart(ObjectId userId);

}
