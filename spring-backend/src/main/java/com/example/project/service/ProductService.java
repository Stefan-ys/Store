package com.example.project.service;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductStoreResponse;
import org.bson.types.ObjectId;

import java.util.List;

public interface ProductService {
    void addProduct(ProductRequest productBindingModel);

    ProductStoreResponse getProduct(ObjectId productId);

    List<ProductStoreResponse> getAllProducts();

    List<ProductStoreResponse> getProductsByCategory(String category);

    List<ProductStoreResponse> getProductsByStatus(String status);

    void editProduct(ObjectId productId, ProductRequest productBindingModel);

    void setProductStatus(ObjectId productId, String status);

    void removeProductStatus(ObjectId productId, String status);

    void deleteProduct(ObjectId productId);
}
