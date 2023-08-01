package com.example.project.service;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface ProductService {
    void addProduct(ProductRequest productBindingModel);

    ProductResponse getProduct(ObjectId productId);

    List<ProductResponse> getAllProducts();

    List<ProductResponse> getProductsByCategory(String category);

    List<ProductResponse> getProductsByStatus(String status);

    void editProduct(ObjectId productId, ProductRequest productBindingModel);

    void setProductStatus(ObjectId productId, String status);

    void removeProductStatus(ObjectId productId, String status);

    void deleteProduct(ObjectId productId);
}
