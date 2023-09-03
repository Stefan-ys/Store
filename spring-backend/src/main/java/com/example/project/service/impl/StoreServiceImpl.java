package com.example.project.service.impl;

import com.example.project.model.entity.ProductEntity;
import com.example.project.model.enums.ProductCategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import com.example.project.payload.response.ProductResponse;
import com.example.project.repository.ProductRepository;
import com.example.project.service.StoreService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StoreServiceImpl implements StoreService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<ProductResponse> getAllProducts(Pageable paging) {
        Page<ProductEntity> products = productRepository.findAll(paging);
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, products.getTotalElements());
    }


    @Override
    public Page<ProductResponse> getAllProductsByStatus(String status, Pageable paging) {
        ProductStatusEnum statusEnum = ProductStatusEnum.valueOf(status.toUpperCase());
        Page<ProductEntity> products = productRepository.findAllByStatus(statusEnum, paging);
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, products.getTotalElements());
    }

    @Override
    public Page<ProductResponse> getProductsByCategory(String category, Pageable paging) {
        ProductCategoryEnum categoryEnum = ProductCategoryEnum.valueOf(category.toUpperCase());
        Page<ProductEntity> products = productRepository.findAllByProductCategory(categoryEnum, paging);
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, products.getTotalElements());
    }

    private ProductResponse convertToProductResponse(ProductEntity product) {
        ProductResponse productResponse = modelMapper.map(product, ProductResponse.class);
        productResponse.setId(product.getId().toString());
        return productResponse;
    }
}
