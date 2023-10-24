package com.example.project.service;

import com.example.project.payload.response.ProductResponse;
import com.example.project.payload.response.ProductResponseAdminTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StoreService {

    // Create

    // Retrieve
    Page<ProductResponse> getProducts(Pageable paging, String[] categories, String[] status);
    Page<ProductResponse> getAllProducts(Pageable paging);

    Page<ProductResponse> searchForProduct(Pageable pageable, String keyWord);

    Page<ProductResponse> getAllProductsByStatus(String status, Pageable paging);
    Page<ProductResponse> getProductsByCategory(String category, Pageable paging);

    // Update

    // Delete

}
