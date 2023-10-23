package com.example.project.service.impl;

import com.example.project.model.entity.CommentEntity;
import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.CommentResponse;
import com.example.project.payload.response.ProductResponse;
import com.example.project.model.entity.ProductEntity;
import com.example.project.model.enums.ProductCategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import com.example.project.payload.response.ProductResponseAdminTable;
import com.example.project.repository.CommentRepository;
import com.example.project.repository.ProductRepository;
import com.example.project.service.ProductService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
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

        return convertToProductResponse(productEntity);
    }

    @Override
    public List<ProductResponseAdminTable> getAllProducts() {
        return productRepository
                .findAll()
                .stream()
                .map(this::convertToProductResponseAdminTable)
                .collect(Collectors.toList());
    }

    //Update

    @Override
    public void editProduct(ObjectId productId, ProductRequest productBindingModel) {
        ProductEntity productEntity = getProductById(productId);
        modelMapper.map(productBindingModel, productEntity);
        productRepository.save(productEntity);
    }


    @Override
    public void changeProductStatus(ObjectId productId, List<String> statusList) {
        ProductEntity productEntity = getProductById(productId);
        productEntity.setStatus(new HashSet<>());
        statusList.forEach(status -> {
            ProductStatusEnum productStatusEnum = getProductStatusEnum(status);
            productEntity.getStatus().add(productStatusEnum);
        });
        productRepository.save(productEntity);
    }

    @Override
    public List<ProductResponse> getHomePageProductsByStatus(ProductStatusEnum statusEnum, Pageable pageable) {
        return productRepository
                .findAllByStatus(statusEnum, pageable)
                .stream()
                .map(this::convertToProductResponse)
                .toList();
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

    private ProductResponse convertToProductResponse(ProductEntity productEntity) {
        ProductResponse productResponse = modelMapper.map(productEntity, ProductResponse.class);
        productResponse.setUsersRatingCount(productEntity.getUsersRating().size());

        List<CommentResponse> commentResponses = commentRepository
                .findAllByProductIdOrderByCreatedDateAsc(productEntity.getId())
                .stream()
                .map(this::convertToCommentResponse)
                .collect(Collectors.toList());

        productResponse.setComments(commentResponses);
        return productResponse;
    }

    private ProductResponseAdminTable convertToProductResponseAdminTable(ProductEntity productEntity) {
        ProductResponseAdminTable productResponse = new ProductResponseAdminTable();
        productResponse.setId(productEntity.getId().toString());
        productResponse.setName(productEntity.getName());
        productResponse.setDateAdded(String.format("%s (%s ago)", formatLocalDateTime(productEntity.getCreatedDate()), getTimeBetween(productEntity.getCreatedDate(), LocalDateTime.now())));
        productResponse.setEditedDate(String.format("%s (%s ago)", formatLocalDateTime(productEntity.getLastModifiedDate()), getTimeBetween(productEntity.getLastModifiedDate(), LocalDateTime.now())));
        productResponse.setCatalogNumber(productEntity.getCatalogNumber());
        productResponse.setPrice(productEntity.getPrice());
        productResponse.setWeight(productEntity.getWeight());
        productResponse.setQuantity(productEntity.getQuantity());
        productResponse.setImages(productEntity.getImages().size());
        productResponse.setDescription
                (productEntity.getDescription().length() <= 20 ?
                        productEntity.getDescription() :
                        productEntity.getDescription().substring(0, 20) + "...");
        productResponse.setStatus(productEntity.getStatus().toString().replaceAll("[\\[\\]]", "").replaceAll("_", " "));
        productResponse.setProductCategory(productEntity.getProductCategory().toString());
        productResponse.setManufacturer(productEntity.getManufacturer());
        productResponse.setRating(String.format("%.1f(%d)", productEntity.getRating(), productEntity.getUsersRating().size()));
        productResponse.setComments(commentRepository.findAllByProductId(productEntity.getId()).size());
        productResponse.setSells(productEntity.getSells());
        productResponse.setViews(productEntity.getViews());
        productResponse.setDimensions(String.format("w-%d/l-%d/h-%d",
                productEntity.getDimensions().getWidth(),
                productEntity.getDimensions().getLength(),
                productEntity.getDimensions().getHeight()));
        return productResponse;
    }
}
