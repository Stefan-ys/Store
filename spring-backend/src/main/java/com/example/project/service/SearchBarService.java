package com.example.project.service;

import com.example.project.payload.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchBarService {
    Page<ProductResponse> searchForProduct(Pageable paging, String keyWord);
}
