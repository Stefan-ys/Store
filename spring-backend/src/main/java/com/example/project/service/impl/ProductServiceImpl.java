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

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;


    //Create

    @Override
    public void addProduct(ProductRequest productBindingModel) {
        ProductEntity productEntity = modelMapper.map(productBindingModel, ProductEntity.class);
        productRepository.save(productEntity);
    }

    //Retrieve

    @Override
    public ProductResponse getProduct(ObjectId productId) {
        ProductEntity productEntity = getProductById(productId);

        ProductResponse productResponse = modelMapper.map(productEntity, ProductResponse.class);

        List<CommentResponse> commentResponses = commentRepository
                .findAllByProductIdOrderByReviewDateAsc(productId)
                .stream()
                .map(comment -> modelMapper.map(comment, CommentResponse.class))
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
    public void commentProduct(ObjectId productId, String username, String comment, int rating) {
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setProductId(productId);
        commentEntity.setUsername(username);
        commentEntity.setComment(comment);
        commentEntity.setReviewDate(LocalDate.now());
        commentEntity.setRating(rating);
        commentRepository.save(commentEntity);

    }

    @Override
    public void rateProduct(ObjectId productId, String username, int rating) {
        ProductEntity productEntity = getProductById(productId);
        productEntity.getUsersRating().put(username, rating);
        double sum = (double) productEntity.getUsersRating().values().stream().reduce(0, Integer::sum)
                / productEntity.getUsersRating().size();

//        sum = Math.round(sum * 10.0) / 10.0;
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
}
