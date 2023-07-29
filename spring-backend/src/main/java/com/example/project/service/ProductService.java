package com.example.project.service;

import com.example.project.model.dto.binding.ProductBindingModel;
import com.example.project.model.dto.view.ProductViewModel;
import org.bson.types.ObjectId;

import java.util.List;

public interface ProductService {
    void addProduct(ProductBindingModel productBindingModel);

    ProductViewModel getProduct(ObjectId productId);

    List<ProductViewModel> getAllProducts(ObjectId productId);

    void editProduct(ObjectId productId, ProductBindingModel productBindingModel);

    void deleteProduct(ObjectId productId);
}
