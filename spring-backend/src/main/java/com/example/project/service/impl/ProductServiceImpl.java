package com.example.project.service.impl;

import com.example.project.payload.request.ProductRequest;
import com.example.project.payload.response.ProductStoreResponse;
import com.example.project.model.entity.ProductEntity;
import com.example.project.model.enums.CategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import com.example.project.repository.ProductRepository;
import com.example.project.service.ProductService;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
//    private final GridFSBucket gridFSBucket;

    @Override
    public void addProduct(ProductRequest productBindingModel) {
        ProductEntity productEntity = modelMapper.map(productBindingModel, ProductEntity.class);
        productRepository.save(productEntity);
    }

    @Override
    public ProductStoreResponse getProduct(ObjectId productId) {
        ProductEntity productEntity = getProductById(productId);
        return modelMapper.map(productEntity, ProductStoreResponse.class);
    }

    @Override
    public List<ProductStoreResponse> getAllProducts(String sortBy) {
        List<ProductEntity> products = productRepository.findAll();
        return products.stream()
                .map(product -> {
                    ProductStoreResponse productStoreResponse = modelMapper
                            .map(product, ProductStoreResponse.class);
                    productStoreResponse.setId(product.getId().toString());
                    return productStoreResponse;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductStoreResponse> getProductsByCategory(String category, String sortBy) {
        CategoryEnum categoryEnum = getProductCategoryEnum(category);

        List<ProductEntity> products = productRepository.findAllByProductCategory(categoryEnum);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductStoreResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductStoreResponse> getProductsByStatus(String status, String sortBy) {
        ProductStatusEnum statusEnum = getProductStatusEnum(status);

        List<ProductEntity> products = productRepository.findAllByStatus(statusEnum);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductStoreResponse.class))
                .collect(Collectors.toList());
    }

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
    public void deleteProduct(ObjectId productId) {
        productRepository.deleteById(productId);
    }

    private ProductEntity getProductById(ObjectId productId) {
        return productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("No product found with ID: " + productId));
    }

    private ProductStatusEnum getProductStatusEnum(String status) {
        return Arrays.stream(ProductStatusEnum.values())
                .filter(c -> c.name().equalsIgnoreCase(status))
                .findFirst()
                .orElse(null);
    }

    private CategoryEnum getProductCategoryEnum(String category) {
        return Arrays.stream(CategoryEnum.values())
                .filter(c -> c.name().equalsIgnoreCase(category))
                .findFirst()
                .orElse(null);
    }


//
//    public void uploadPictures(ObjectId productId, List<MultipartFile> picturesFile) throws IOException {
//        ProductEntity productEntity = getProductById(productId);
//        for (MultipartFile file : picturesFile) {
//            InputStream inputStream = file.getInputStream();
//            GridFSFile gridFSFile = gridFSBucket.uploadFromStream(file.getOriginalFilename(), inputStream);
//            productEntity.getPictures().add(gridFSFile.getId());
//        }
//        productRepository.save(productEntity);
//    }

}
