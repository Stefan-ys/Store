package com.example.project.service.impl;

import com.example.project.model.entity.ProductEntity;
import com.example.project.model.enums.ProductCategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import com.example.project.payload.response.ProductResponse;
import com.example.project.payload.response.ProductResponseAdminTable;
import com.example.project.repository.CommentRepository;
import com.example.project.repository.ProductRepository;
import com.example.project.service.StoreService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.project.util.DateUtils.formatLocalDateTime;
import static com.example.project.util.DateUtils.getTimeBetween;

@Service
@AllArgsConstructor
public class StoreServiceImpl implements StoreService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final CommentRepository commentRepository;

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

    @Override
    public Page<ProductResponseAdminTable> getAllProductsAdminTable(Pageable paging) {
        Page<ProductEntity> products = productRepository.findAll(paging);
        List<ProductResponseAdminTable> productResponses = products.getContent().stream()
                .map(this::convertToProductResponseAdminTable)
                .collect(Collectors.toList());
        return new PageImpl<>(productResponses, paging, products.getTotalElements());
    }

    private ProductResponseAdminTable convertToProductResponseAdminTable(ProductEntity product) {
        ProductResponseAdminTable productResponse = new ProductResponseAdminTable();
        productResponse.setId(product.getId().toString());
        productResponse.setName(product.getName());
        productResponse.setProductCategory(product.getProductCategory().toString());
        productResponse.setPrice(product.getPrice());
        productResponse.setCatalogNumber(product.getCatalogNumber());
        productResponse.setQuantity(product.getQuantity());
        productResponse.setManufacturer(product.getManufacturer());
        productResponse.setComments(commentRepository.findAllByProductId(product.getId()).size());
        productResponse.setImages(product.getImages().size());
        productResponse.setViews(product.getViews());
        productResponse.setDateAdded(formatLocalDateTime(product.getCreatedDate()) + " (" + getTimeBetween(product.getCreatedDate(), LocalDateTime.now())+ " ago)") ;
        productResponse.setStatus(product.getStatus().toString().replaceAll("[\\[\\]\"]", ""));
        productResponse.setEditedDate(formatLocalDateTime(product.getLastModifiedDate()) + " (" + getTimeBetween(product.getLastModifiedDate(), LocalDateTime.now()) + " ago)");
        productResponse.setDimensions(String.format("%d/%d/%d", product.getDimensions().getLength(), product.getDimensions().getHeight(), product.getDimensions().getWidth()));
        productResponse.setRating(product.getRating() + " (" + product.getUsersRating().size() + ")");
        productResponse.setDescription(product.getDescription().length() <= 10 ? productResponse.getDescription() :  product.getDescription().substring(0, 10) + "...");
        productResponse.setSells(product.getSells());
        return productResponse;
    }

    private ProductResponse convertToProductResponse(ProductEntity product) {
        ProductResponse productResponse = modelMapper.map(product, ProductResponse.class);
        productResponse.setId(product.getId().toString());
        productResponse.setDimensions(String.format("%d/%d/%d", product.getDimensions().getLength(), product.getDimensions().getHeight(), product.getDimensions().getWidth()));
        return productResponse;
    }
}
