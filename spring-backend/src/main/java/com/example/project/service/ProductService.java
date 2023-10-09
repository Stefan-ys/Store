package com.example.project.service;

import com.example.project.model.enums.ProductStatusEnum;
import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductResponse;
import com.example.project.payload.response.ProductResponseAdminTable;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    // Create

    void addProduct(ProductRequest productBindingModel);

    // Retrieve

    ProductResponse getProduct(ObjectId productId);
    List<ProductResponseAdminTable> getAllProducts();
    List<ProductResponse> getHomePageProductsByStatus(ProductStatusEnum statusEnum, Pageable pageable);

    // Update

    void editProduct(ObjectId productId, ProductRequest productBindingModel);
    void changeProductStatus(ObjectId productId, List<String> statusList);
    void rateProduct(ObjectId productId, String username, int rating);

    // Delete

    void deleteProduct(ObjectId productId);

}
