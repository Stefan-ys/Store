package com.example.project.service.impl;

import com.example.project.model.dto.binding.ProductBindingModel;
import com.example.project.model.dto.view.ProductViewModel;
import com.example.project.model.entity.ProductEntity;
import com.example.project.repository.ProductRepository;
import com.example.project.service.ProductService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import lombok.AllArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final GridFSBucket gridFSBucket;

    @Override
    public void addProduct(ProductBindingModel productBindingModel) {
        ProductEntity productEntity = modelMapper.map(productBindingModel, ProductEntity.class);
        productRepository.save(productEntity);
    }

    @Override
    public ProductViewModel getProduct(ObjectId productId) {
        ProductEntity productEntity = getProductById(productId);
        return modelMapper.map(productEntity, ProductViewModel.class);
    }

    @Override
    public List<ProductViewModel> getAllProducts(ObjectId productId) {
        List<ProductEntity> products = productRepository.findAll();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductViewModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public void editProduct(ObjectId productId, ProductBindingModel productBindingModel) {
        ProductEntity productEntity = getProductById(productId);
        modelMapper.map(productBindingModel, productEntity);
        productRepository.save(productEntity);
    }

    @Override
    public void deleteProduct(ObjectId productId) {
        productRepository.deleteById(productId);
    }

//    public void uploadPictures(ObjectId productId, List<MultipartFile> picturesFile) throws IOException {
//        ProductEntity productEntity = getProductById(productId);
//       List<ObjectId> pictures =  productEntity.getPictures();
//        for (MultipartFile file : picturesFile) {
//            InputStream inputStream = file.getInputStream();
//            GridFSUploadOptions options = new GridFSUploadOptions().metadata(new Document("productId", productId));
//            ObjectId pictureId = gridFSBucket.uploadFromStream(file.getOriginalFilename(), inputStream, options);
//            productEntity.getPictures().add(pictureId);
//        }
//    }


    private ProductEntity getProductById(ObjectId productId) {
        return productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("No product found with ID: " + productId));
    }
}
