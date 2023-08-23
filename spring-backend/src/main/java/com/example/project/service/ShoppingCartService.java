package com.example.project.service;

import com.example.project.payload.response.ShoppingCartResponse;
import org.bson.types.ObjectId;

public interface ShoppingCartService {

    ShoppingCartResponse getShoppingCart(ObjectId userId);

    void addProductToCart(ObjectId productId, ObjectId userId);

    void removeProductFromCart(ObjectId productId, ObjectId userId);

    void removeAllProductsFromCart(ObjectId userId);

    void setProductQuantity(ObjectId productId, ObjectId userId, int quantity);
}
