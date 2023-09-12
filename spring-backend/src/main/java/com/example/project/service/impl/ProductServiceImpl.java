package com.example.project.service.impl;

import com.example.project.model.entity.CommentEntity;
import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.CommentResponse;
import com.example.project.payload.response.ProductResponse;
import com.example.project.model.entity.ProductEntity;
import com.example.project.model.enums.ProductCategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import com.example.project.repository.CommentRepository;
import com.example.project.repository.ProductRepository;
import com.example.project.service.ProductService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.project.util.DateUtils.formatLocalDateTime;
import static com.example.project.util.DateUtils.getTimeBetween;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;


    //Create

    @Override
    public void addProduct(ProductRequest productRequest) {
        ProductEntity productEntity = modelMapper.map(productRequest, ProductEntity.class);

        productEntity.setProductCategory(ProductCategoryEnum.valueOf(productRequest.getProductCategory().toUpperCase()));
        productRequest.getStatus().forEach(s -> productEntity.getStatus().add(ProductStatusEnum.valueOf(s.toUpperCase())));

        productEntity.getDimensions().setLength(productRequest.getProductLength());
        productEntity.getDimensions().setHeight(productRequest.getProductHeight());
        productEntity.getDimensions().setWidth(productRequest.getProductWidth());

        productRepository.save(productEntity);
    }

    //Retrieve

    @Override
    public ProductResponse getProduct(ObjectId productId) {
        ProductEntity productEntity = getProductById(productId);
        productEntity.setViews(productEntity.getViews() + 1);
        productRepository.save(productEntity);

        ProductResponse productResponse = modelMapper.map(productEntity, ProductResponse.class);
        productResponse.setUsersRatingCount(productEntity.getUsersRating().size());

        List<CommentResponse> commentResponses = commentRepository
                .findAllByProductIdOrderByCreatedDateAsc(productId)
                .stream()
                .map(this::convertToCommentResponse)
                .collect(Collectors.toList());

        productResponse.setComments(commentResponses);

        return productResponse;
    }

    //Update

    @Override
    public void editProduct(ObjectId productId, ProductRequest productBindingModel) {
        ProductEntity productEntity = getProductById(productId);
        modelMapper.map(productBindingModel, productEntity);
        productRepository.save(productEntity);
    }

    @Override
    public void setProductStatus(ObjectId productId, String status) {
        ProductEntity productEntity = getProductById(productId);
        ProductStatusEnum productStatusEnum = getProductStatusEnum(status);
        productEntity.getStatus().add(productStatusEnum);
        productRepository.save(productEntity);
    }

    @Override
    public void removeProductStatus(ObjectId productId, String status) {
        ProductEntity productEntity = getProductById(productId);
        ProductStatusEnum productStatusEnum = getProductStatusEnum(status);
        productEntity.getStatus().remove(productStatusEnum);
        productRepository.save(productEntity);
    }

    @Override
    public void rateProduct(ObjectId productId, String username, int rating) {
        ProductEntity productEntity = getProductById(productId);
        productEntity.getUsersRating().put(username, rating);
        double sum = (double) productEntity.getUsersRating().values().stream().reduce(0, Integer::sum)
                / productEntity.getUsersRating().size();

        sum = Math.round(sum * 10.0) / 10.0;
        productEntity.setRating(sum);

        productRepository.save(productEntity);
    }

    //Delete

    @Override
    public void deleteProduct(ObjectId productId) {
        productRepository.deleteById(productId);
    }


    //Helpers

    private ProductEntity getProductById(ObjectId productId) {
        return productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("No product found with ID: " + productId));
    }

    private ProductStatusEnum getProductStatusEnum(String status) {
        return Arrays.stream(ProductStatusEnum.values())
                .filter(c -> c.name().equalsIgnoreCase(status))
                .findFirst()
                .orElse(null);
    }

    private ProductCategoryEnum getProductCategoryEnum(String category) {
        return Arrays.stream(ProductCategoryEnum.values())
                .filter(c -> c.name().equalsIgnoreCase(category))
                .findFirst()
                .orElse(null);
    }

    private CommentResponse convertToCommentResponse(CommentEntity commentEntity) {
        CommentResponse commentResponse = modelMapper.map(commentEntity, CommentResponse.class);
        commentResponse.setReviewDate(String.format("%s (%s ago)", formatLocalDateTime(commentEntity.getCreatedDate()), getTimeBetween(commentEntity.getCreatedDate(), LocalDateTime.now())));
        return commentResponse;
    }
}
