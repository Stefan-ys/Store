package com.example.project.service;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface ProductService {

    //Create

    void addProduct(ProductRequest productBindingModel);

    //Retrieve

    ProductResponse getProduct(ObjectId productId);

    //Update

    void editProduct(ObjectId productId, ProductRequest productBindingModel);

    void setProductStatus(ObjectId productId, String status);

    void commentProduct(ObjectId productId, String username, String comment, int rating);

    void rateProduct(ObjectId productId, String username, int rating);

    //Delete

    void deleteProduct(ObjectId productId);

    void removeProductStatus(ObjectId productId, String status);
}
