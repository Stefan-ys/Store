package com.example.project.service;

import com.example.project.model.dto.binding.ProductBindingModel;
import com.example.project.model.dto.view.ProductViewModel;
import com.example.project.model.enums.CategoryEnum;
import com.example.project.model.enums.ProductStatusEnum;
import org.bson.types.ObjectId;

import java.util.List;

public interface ProductService {
    void addProduct(ProductBindingModel productBindingModel);

    ProductViewModel getProduct(ObjectId productId);

    List<ProductViewModel> getAllProducts();

    List<ProductViewModel> getProductsByCategory(String category);

    List<ProductViewModel> getProductsByStatus(String status);

    void editProduct(ObjectId productId, ProductBindingModel productBindingModel);

    void setProductStatus(ObjectId productId, String status);

    void removeProductStatus(ObjectId productId, String status);

    void deleteProduct(ObjectId productId);
}
