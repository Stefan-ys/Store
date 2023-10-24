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

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class StoreServiceImpl implements StoreService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    // Create

    // Retrieve

    @Override
    public Page<ProductResponse> getAllProducts(Pageable paging) {
        Page<ProductEntity> products = productRepository.findAll(paging);
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, products.getTotalElements());
    }

    @Override
    public Page<ProductResponse> searchForProduct(Pageable pageable, String keyWord) {
        Page<ProductEntity> products = productRepository.searchByNameIgnoreCaseContaining(keyWord, pageable);

        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(productResponses, pageable, products.getTotalElements());
    }

    @Override
    public Page<ProductResponse> getAllProductsByStatus(String status, Pageable paging) {
        ProductStatusEnum statusEnum = ProductStatusEnum.valueOf(convertStringToEnumString(status));
        Page<ProductEntity> products = productRepository.findAllByStatus(statusEnum, paging);
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, products.getTotalElements());
    }

    @Override
    public Page<ProductResponse> getProductsByCategory(String category, Pageable paging) {
        ProductCategoryEnum categoryEnum = ProductCategoryEnum.valueOf(convertStringToEnumString(category));
        Page<ProductEntity> products = productRepository.findAllByProductCategory(categoryEnum, paging);
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, products.getTotalElements());
    }

    @Override
    public Page<ProductResponse> getProducts(Pageable paging, String[] categories, String[] status) {
        String[] cat =  Arrays.stream(categories).map(this::convertStringToEnumString).toArray(String[]::new);;
        String[] stat = Arrays.stream(status).map(this::convertStringToEnumString).toArray(String[]::new);;

        Page<ProductEntity> products;
        if ((categories.length == 0 || categories[0].equals("Show All")) && (status.length == 0 || status[0].equals("Show All"))) {
            products = productRepository.findAll(paging);
        } else if (categories.length == 0 || categories[0].equals("Show All")) {
            products = productRepository.findByStatusIn(stat, paging);
        } else if (status.length == 0 || status[0].equals("Show All")) {
            products = productRepository.findByProductCategoryIn(cat, paging);
        } else {
            products = productRepository.findByProductCategoryInAndStatusIn(cat, stat, paging);
        }

        List<ProductResponse> productResponses = products.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, products.getTotalElements());
    }

    // Update

    // Delete

    // Helpers


    private ProductResponse convertToProductResponse(ProductEntity product) {
        ProductResponse productResponse = modelMapper.map(product, ProductResponse.class);
        productResponse.setId(product.getId().toString());
        productResponse.setDimensions(String.format("%d/%d/%d", product.getDimensions().getLength(), product.getDimensions().getHeight(), product.getDimensions().getWidth()));
        return productResponse;
    }

    private String convertStringToEnumString(String str) {
        return str.trim().toUpperCase().replaceAll(" ", "_");
    }
}
