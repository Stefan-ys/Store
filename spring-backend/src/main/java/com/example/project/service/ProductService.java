package com.example.project.service;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface ProductService {

    ProductResponse getProduct(ObjectId productId);

    List<ProductResponse> getAllProducts(String sortBy);

    void addProduct(ProductRequest productBindingModel);

    void editProduct(ObjectId productId, ProductRequest productBindingModel);

    void setProductStatus(ObjectId productId, String status);

    void removeProductStatus(ObjectId productId, String status);

    void deleteProduct(ObjectId productId);

    void commentProduct(ObjectId productId, String username, String comment, int rating);

    void rateProduct(ObjectId productId, String username, int rating);
}
